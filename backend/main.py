from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import csv
import io
from typing import List, Dict
from pydantic import BaseModel

# Import Secret Santa classes
from secret_santa.employee import Employee
from secret_santa.game import SecretSantaGame

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmployeeModel(BaseModel):
    Employee_Name: str
    Employee_EmailID: str

class AssignmentModel(BaseModel):
    Employee_Name: str
    Employee_EmailID: str
    Secret_Child_Name: str
    Secret_Child_EmailID: str

@app.post("/api/upload-employees")
async def upload_employees(file: UploadFile):
    if not file.filename.endswith('.csv'):
        raise HTTPException(400, "File must be a CSV")
    
    try:
        contents = await file.read()
        csv_data = contents.decode()
        employees = []
        
        # Parse CSV data
        csv_reader = csv.DictReader(io.StringIO(csv_data))
        for row in csv_reader:
            employees.append(EmployeeModel(
                Employee_Name=row['Employee_Name'],
                Employee_EmailID=row['Employee_EmailID']
            ))
        
        return {"employees": employees}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/upload-previous")
async def upload_previous(file: UploadFile):
    if not file.filename.endswith('.csv'):
        raise HTTPException(400, "File must be a CSV")
    
    try:
        contents = await file.read()
        csv_data = contents.decode()
        previous = {}
        
        # Parse CSV data
        csv_reader = csv.DictReader(io.StringIO(csv_data))
        for row in csv_reader:
            previous[row['Employee_EmailID']] = row['Secret_Child_EmailID']
        
        return {"previous": previous}
    except Exception as e:
        raise HTTPException(500, str(e))

@app.post("/api/generate-assignments")
async def generate_assignments(employees: List[EmployeeModel], previous: Dict[str, str] = None):
    try:
        # Convert to Employee objects
        employee_objects = [
            Employee(emp.Employee_Name, emp.Employee_EmailID)
            for emp in employees
        ]
        
        # Create game instance
        game = SecretSantaGame(employee_objects, previous)
        
        # Generate assignments
        assignments = game.assign_secret_children()
        
        # Convert to response format
        result = []
        for assignment in assignments:
            result.append(AssignmentModel(
                Employee_Name=assignment.santa.name,
                Employee_EmailID=assignment.santa.email,
                Secret_Child_Name=assignment.child.name,
                Secret_Child_EmailID=assignment.child.email
            ))
        
        return {"assignments": result}
    except Exception as e:
        raise HTTPException(500, str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

