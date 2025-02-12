from secret_santa.employee import Employee

class Assignment:
    def __init__(self, santa: Employee, child: Employee):
        self.santa = santa
        self.child = child

    def __eq__(self, other):
        if isinstance(other, Assignment):
            return self.santa == other.santa and self.child == other.child
        return False

    def __hash__(self):
        return hash((self.santa, self.child))

