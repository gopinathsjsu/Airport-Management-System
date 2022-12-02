# Team-sunrisers
# AIRPORT MANAGEMENT SYSTEM
team-project-sunrisers created by GitHub Classroom

Implement an end2end Airport Management system that can be configured for a given airport (Web interface or Mobile app interface with supporting Backend APIs), that integrates Airline Flight Schedules, Gate Assignments, Baggage Claim assignment for arriving flights

The emphasis here is on team collaboration, so the points awarded will be based on individual contributions to the team and how the team performed overall.  

Components:

APIs - input and output of API should be in JSON and should include error handling and validation of inputs
APIs will be demonstrated using a Web/mobile UI
UI is accessed by Passengers (Customers) and Airline employees and Airport employees (3 roles)

APIs should support following functionality:

Retrieve Flight arrivals and departures and Gate assignments - based on time durations (next hour, next 2 hours, next 4 hours) - this data will be displayed in multiple monitors throughout the airport - viewable by all users
Implement a Random Gate assignment for Arriving and Departing flights - designed to prevent conflicting assignments - allow for an hour for each flight to be at the gate (for arrivals and for departures)

Airport employees :
//check
Enable or disable one or more gates for maintenance
Assign Baggage Carousel number to Arriving flights - the system should prevent conflicting assignments
Baggage Claim information will be displayed in multiple monitors in the Arrival area

Airline employees:

Add or update the schedule of flights belonging to their airline relevant to that airport (arrivals and departures)
APIs and UI functionality will be available based on Roles specified above
Assume Gates are distributed in multiple terminals (1, 2, 3 to keep it simple)
Assume Gates are labeled as A1-A32, B1-B32 and C1-C32
Deploy API to AWS in an Auto Scaled EC2 Cluster with Load Balancer (or another cloud provider)
Develop a Web or mobile UI that will make use of the APIs
Create your own database with mock data - use SFO or SJC as an example airport for your data

Sprint Task sheet:
https://docs.google.com/spreadsheets/d/1_prkpVrGgiKawTzG38J9yJV51SBAehM06tZmhmsZ2x4/edit?usp=sharing

# Sunrisers

Team Members:

- Vikas Tadepu (015964468)
- Thanuj Kumar Janugani (015963285)
- Varun Raj Badri (015918006)
- Jatin Lingala (016699124)

### <a href="https://github.com/gopinathsjsu/team-project-sunrisers">Github Repo</a>

## Responsibilities

<b>Front End, Back End</b>:  Vikas Tadepu, Thanuj Kumar Janugani, Varun Raj Badri, Jatin Lingala <br>

## Contributions 


- Vikas Tadepu : Front-End and Back-End

- Thanuj Kumar Janugani: Front-End and Back-End

- Varun Raj Badri: Front-End and Back-End

- Jatin Lingala:Front-End and Back-End



## XP Core Values

- **_Communication_** : We conducted meetings every week in-person to discuss crucial aspects of the project by collaborating and communicating with each other.
- **_Feedback_** : Team members delivered software frequently, got feedback about it, and refractored the code to make improvements for working code and fix bugs.

<b>How the team kept the core value? </b>
- Team meetings were held during which diagrams were created to depict the structure of the tables in the back-end. <br>
- Mock-ups of how the front-end will look like on Figma. <br>
- Every Standup contains a discussion of the work completed, the obstacles encountered, and any deviations from the diagrams and mockups in the implementation.

## TECH STACK USED:

- Frontend: Html,Javascript,css,ReactJS
- Backend: Flask
- Database: Mongodb
- REST API: Postman(Testing APIs)
- Cloud: AWS EC2

# Feature Set:

## Passenger:
- Can view the arrival/departure schedule of flights.
- Can also view the baggage carousal details of arrival flights.
## Airline Employee:
- Can be able to add/modify the schedule of flights.
## Airport Employee
- Can enable or disable the gate for maintenance.
- Can enable or disable the baggage carousel.
- Approves the signup requests
- Can add new Airline service to the airport.
- Can add gates and baggage carousels.
## System:
- Assigns gates.
- Asssigns baggage carousal to the arriving flights.


## ER DIAGRAM:



![WhatsApp Image 2022-10-26 at 1 44 17 PM](https://user-images.githubusercontent.com/54031828/198146885-79e95b55-2862-405d-8711-c6c334e72da0.jpeg)

## Architecture Diagram:

![UML-Page-12](https://user-images.githubusercontent.com/41760133/205190437-94936059-a98a-49dd-98d3-c8b4be263406.jpg)

## VIDEO DEMO
   https://drive.google.com/file/d/1VodkM9gfXeMA107RadPc9Tl3sfGBGZRm/view?usp=sharing
   
## AWS CLOUD

#Load Balacer DNS: SJU-Airport-767720459.us-west-2.elb.amazonaws.com

![instances1](https://user-images.githubusercontent.com/41760133/205189042-42dd7945-7585-493c-8b6a-508eaabec822.JPG)

![Load_Balancer](https://user-images.githubusercontent.com/41760133/205189053-e491ba5d-225d-44ba-a83f-0871973ee01a.JPG)

## Use Case Diagram:
 
![abc (1)](https://user-images.githubusercontent.com/41760133/204976509-8052f9db-42ff-4284-bf91-f86366d551ad.jpg)
## UI Wireframes:
Figma design Linkhttps: www.figma.com/file/F5sQzR8TE6mZyyn1si06qb/SJU-Airport-team?node-id=0%3A1&t=ZVJbCbGo2jiwnRlG-0
<img width="689" alt="Screenshot 2022-11-29 at 10 50 37 PM" src="https://user-images.githubusercontent.com/54031828/204728985-3c03aa08-b2aa-4aa2-9717-c8d62cb0db8f.png">
<img width="690" alt="Screenshot 2022-11-29 at 10 52 18 PM" src="https://user-images.githubusercontent.com/54031828/204729013-13be70d0-3bd5-4243-9def-0791f78f2fa0.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 52 33 PM" src="https://user-images.githubusercontent.com/54031828/204729036-4498235b-5b60-4649-a379-890b023bb05b.png">
<img width="688" alt="Screenshot 2022-11-29 at 10 53 01 PM" src="https://user-images.githubusercontent.com/54031828/204729054-db334737-9e3f-4ee6-bde7-93130a1a4fe1.png">
<img width="691" alt="Screenshot 2022-11-29 at 10 53 16 PM" src="https://user-images.githubusercontent.com/54031828/204729075-0fadf582-aa73-4eb5-b953-30e9fed8e83a.png">
<img width="692" alt="Screenshot 2022-11-29 at 10 53 28 PM" src="https://user-images.githubusercontent.com/54031828/204729083-3dce438c-f5ce-4a09-ab87-8c878296be06.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 54 16 PM" src="https://user-images.githubusercontent.com/54031828/204729090-699053f7-f21a-4031-bada-79ec0fc20e92.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 54 30 PM" src="https://user-images.githubusercontent.com/54031828/204729106-c266ea54-dded-4d03-bca0-60a5a4d6a773.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 54 41 PM" src="https://user-images.githubusercontent.com/54031828/204729114-95f7b48d-5099-45c4-8f3f-0d3349c73d1c.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 54 51 PM" src="https://user-images.githubusercontent.com/54031828/204729124-77181bc9-6f64-4da4-ab11-3cbb6a81d4e6.png">
<img width="690" alt="Screenshot 2022-11-29 at 10 55 02 PM" src="https://user-images.githubusercontent.com/54031828/204729156-90d4246d-c489-4e19-a126-610d466b00b9.png">
<img width="691" alt="Screenshot 2022-11-29 at 10 55 13 PM" src="https://user-images.githubusercontent.com/54031828/204729172-d736e4a8-caf8-45c4-bf85-313269b041cf.png">
<img width="691" alt="Screenshot 2022-11-29 at 10 55 28 PM" src="https://user-images.githubusercontent.com/54031828/204729200-be04d0c3-ca26-45dc-9512-021e80ae6286.png">
<img width="689" alt="Screenshot 2022-11-29 at 10 56 03 PM" src="https://user-images.githubusercontent.com/54031828/204729207-d3891b6a-5671-41f7-bf84-7ec9bf33fa41.png">
<img width="693" alt="Screenshot 2022-11-29 at 10 56 14 PM" src="https://user-images.githubusercontent.com/54031828/204729220-402b8e8a-7fea-4167-86be-18c7abf30d09.png">








