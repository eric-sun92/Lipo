CREATE TABLE Client (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    PhoneNumber VARCHAR(20),
    PhysicalAddress VARCHAR(255),
    Email VARCHAR(255)
);

CREATE TABLE Employee (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    PhoneNumber VARCHAR(20),
    PhysicalAddress VARCHAR(255),
    Email VARCHAR(255),
    JobTitle VARCHAR(255),
    Specialty VARCHAR(255),
    PayRate DECIMAL(10, 2)
);

CREATE TABLE Service (
    ServiceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Price DECIMAL(10, 2)
);

CREATE TABLE Appointment (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE,
    Time TIME,
    ClientID INT,
    EmployeeID INT,
    ServiceID INT,
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
);

CREATE TABLE ClientEmployeePreference (
    ClientID INT,
    EmployeeID INT,
    PRIMARY KEY (ClientID, EmployeeID),
    FOREIGN KEY (ClientID) REFERENCES Client(ClientID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);