class Employee:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __eq__(self, other):
        if isinstance(other, Employee):
            return self.email == other.email
        return False

    def __hash__(self):
        return hash(self.email)

