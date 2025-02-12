import random
from typing import List, Dict
from secret_santa.employee import Employee
from secret_santa.assignment import Assignment

class SecretSantaGame:
    def __init__(self, employees: List[Employee], previous_assignments: Dict[str, str] = None):
        self.employees = employees
        self.previous_assignments = previous_assignments or {}

    def assign_secret_children(self) -> List[Assignment]:
        available_children = self.employees.copy()
        assignments = []

        for santa in self.employees:
            possible_children = [child for child in available_children if child != santa]
            
            if santa.email in self.previous_assignments:
                previous_child_email = self.previous_assignments[santa.email]
                possible_children = [child for child in possible_children if child.email != previous_child_email]

            if not possible_children:
                raise ValueError("Unable to assign a secret child for all employees.")

            child = random.choice(possible_children)
            assignments.append(Assignment(santa, child))
            available_children.remove(child)

        return assignments

