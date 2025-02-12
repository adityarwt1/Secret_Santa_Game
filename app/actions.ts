"use server"

import { spawn } from "child_process"
import { writeFile } from "fs/promises"
import { join } from "path"

interface Employee {
  Employee_Name: string
  Employee_EmailID: string
}

export async function assignSecretSanta(employees: Employee[]) {
  try {
    // Write input CSV
    const inputCsv = join(process.cwd(), "temp-input.csv")
    const csvContent = [
      "Employee_Name,Employee_EmailID",
      ...employees.map((e) => `${e.Employee_Name},${e.Employee_EmailID}`),
    ].join("\n")

    await writeFile(inputCsv, csvContent)

    // Output file path
    const outputCsv = join(process.cwd(), "temp-output.csv")

    // Run Python script
    const pythonProcess = spawn("python", ["secret_santa/main.py", inputCsv, outputCsv])

    return new Promise((resolve, reject) => {
      let output = ""
      let error = ""

      pythonProcess.stdout.on("data", (data) => {
        output += data.toString()
      })

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString()
      })

      pythonProcess.on("close", async (code) => {
        if (code !== 0) {
          reject(new Error(error || "Failed to generate assignments"))
          return
        }

        try {
          // Read output CSV and parse results
          const outputData = await fetch(outputCsv).then((res) => res.text())
          const rows = outputData.split("\n")
          const assignments = rows.slice(1).map((row) => {
            const [name, email, childName, childEmail] = row.split(",")
            return {
              Employee_Name: name,
              Employee_EmailID: email,
              Secret_Child_Name: childName,
              Secret_Child_EmailID: childEmail,
            }
          })
          resolve(assignments)
        } catch (err) {
          reject(new Error("Failed to parse assignments"))
        }
      })
    })
  } catch (error) {
    throw new Error("Failed to process Secret Santa assignments")
  }
}

