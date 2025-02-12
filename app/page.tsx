"use client"
// improting module to use in this project by the using shadcn ui to make this project
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, RefreshCw } from "lucide-react"

// declaration of string according to the rule of type script
interface Employee {
  Employee_Name: string
  Employee_EmailID: string
}

interface Assignment {
  Employee_Name: string
  Employee_EmailID: string
  Secret_Child_Name: string
  Secret_Child_EmailID: string
}

const API_URL = "http://localhost:8000";


export default function SecretSanta() {
  // collect data from input
  const [employees, setEmployees] = useState<Employee[]>([])
  const [previousAssignments, setPreviousAssignments] = useState<Record<string, string>>({})
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  ///// Uploads an employee list CSV to the backend and updates the state.
  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${API_URL}/api/upload-employees`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload employee list")

      const data = await response.json()
      setEmployees(data.employees)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file")
    }
  }


//// Uploads a previous assignments CSV to the backend and updates the state.
  const handlePreviousFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] /// 0 for treat the file with binary object module (blob)
    if (!file) return

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${API_URL}/api/upload-previous`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload previous assignments")

      const data = await response.json()
      setPreviousAssignments(data.previous)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file")
    }
  }





  //// Sends data to the backend to generate Secret Santa assignments and updates the UI.
  const generateAssignments = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(`${API_URL}/api/generate-assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employees,
          previous: Object.keys(previousAssignments).length > 0 ? previousAssignments : undefined,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate assignments")

      const data = await response.json()
      setAssignments(data.assignments)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }


  /// Converts assignments to a CSV file and downloads it.
  const downloadAssignments = () => {
    if (!assignments.length) return

    const headers = ["Employee_Name", "Employee_EmailID", "Secret_Child_Name", "Secret_Child_EmailID"]
    const csvContent = [
      headers.join(","),
      ...assignments.map((row) =>
        [row.Employee_Name, row.Employee_EmailID, row.Secret_Child_Name, row.Secret_Child_EmailID].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "secret-santa-assignments.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Secret Santa Assignment System</CardTitle>
          <CardDescription>
            Upload employee list and previous assignments to generate new Secret Santa pairs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Employee List (CSV)</label>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("input-file")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Employee List
              </Button>
              <input id="input-file" type="file" accept=".csv" className="hidden" onChange={handleInputFile} />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Previous Assignments (CSV)</label>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("previous-file")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Previous Assignments
              </Button>
              <input id="previous-file" type="file" accept=".csv" className="hidden" onChange={handlePreviousFile} />
            </div>
          </div>

          {employees.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Employees</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee, i) => (
                    <TableRow key={i}>
                      <TableCell>{employee.Employee_Name}</TableCell>
                      <TableCell>{employee.Employee_EmailID}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={generateAssignments} disabled={!employees.length || loading} className="flex-1">
              {loading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
              Generate Assignments
            </Button>
            <Button variant="outline" onClick={downloadAssignments} disabled={!assignments.length} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Assignments
            </Button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {assignments.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Secret Santa Assignments</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Santa</TableHead>
                    <TableHead>Child</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {assignment.Employee_Name}
                        <br />
                        <span className="text-sm text-muted-foreground">{assignment.Employee_EmailID}</span>
                      </TableCell>
                      <TableCell>
                        {assignment.Secret_Child_Name}
                        <br />
                        <span className="text-sm text-muted-foreground">{assignment.Secret_Child_EmailID}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

