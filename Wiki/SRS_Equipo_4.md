<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 36

Conversion time: 12.655 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Mon Mar 13 2023 00:05:13 GMT-0700 (PDT)
* Source doc: Software Requirements Specification Template
* Tables are currently converted to HTML tables.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="text-align: right">
<strong>	</strong></p>



# Software Requirements Specification


# for


# NDS Cars

<p style="text-align: right">
<strong>Version 1.0</strong></p>


<p style="text-align: right">
<strong>Prepared by Alexa Serrano Negrete,  \
Andrea Serrano Diego, Tonatiuh Reyes Huerta, \
and Alfredo Jeong Hyun Park</strong></p>


<p style="text-align: right">
<strong>IA Tech \
</strong></p>


<p style="text-align: right">
<strong><em>Tecnológico de Monterrey</em></strong></p>


<p style="text-align: right">
<strong>March 1st, 2023</strong></p>


**Table of Contents**


[TOC]


**Revision History**


<table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Date</strong>
   </td>
   <td><strong>Reason For Changes</strong>
   </td>
   <td><strong>Version</strong>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>




1. 
Introduction
This SRS begins by explaining the purpose of the project, the scope, and the end product. Throughout the document, the schematics of the platform, the operating system of the team’s work environment, as well as the dependencies and libraries on which the project will be working. There is a special emphasis on the additional functionalities the web-application shall include. Afterward, the database model, logic, distribution, and security restrictions for data. Next, the processes of the interfaces and how they will be seen in the final product, together with the communications that will exist, are explained. At the end, the quality, performance and security standards are explained.



    1. 
Purpose 
This document is the first release of system specifications, and is intended for developers, project managers, testers and documentation writers.



    2. 
Project Scope
The proposed platform has the objective of buying and selling new cars, directly from certified agencies. The main goal is to facilitate the purchase of a vehicle by making it digital, achievable through any device connected to the internet. In so, the platform will unify the sending of documents and the search of cars, enabling a simple, digital and protected way of making the payment without losing the unique promotions agencies have. The platform will as well allow potential buyers to have a personalized test drive to help choose the ideal car for each customer. From there, important statistics and KPIs will be generated for sellers to have insights on their business, while also gaining important information that could help to develop new business models, marketing strategies, and sales strategies.



    3. 
References

        _Autotrader_. (2023). Autotrader. [https://www.autotrader.com/](https://www.autotrader.com/)


        _Compra y Venta de Autos Usados | Agencia de Autos México #1_. (2022). Kavak. [https://www.kavak.com/mx/?gclid=CjwKCAiA3KefBhByEiwAi2LDHKoP0vyFq22kC452FdCrZDBEjS1_A2KcUMbcSf389VfcKqm5IS3JKhoCrG4QAvD_BwE](https://www.kavak.com/mx/?gclid=CjwKCAiA3KefBhByEiwAi2LDHKoP0vyFq22kC452FdCrZDBEjS1_A2KcUMbcSf389VfcKqm5IS3JKhoCrG4QAvD_BwE)


        _Performance Efficiency - AWS Well-Architected Framework. (2019). Amazon.com. [https://wa.aws.amazon.com/wat.pillar.performance.en.html](https://wa.aws.amazon.com/wat.pillar.performance.en.html)_


        _Turo car sharing marketplace | Rent the perfect car_. (2020). Turo.com. [https://turo.com/](https://turo.com/)



2. 
Overall Description
This web platform will be hosted in the cloud, and is meant to be reactive, hence, making it multiplatform on both mobile devices and PC. It will only be available for Mexico in accordance to the laws and restrictions of the country. The tech stack and dependencies will be explained in more detail below, but it will be MERN with Apache and MySQL.



    4. 
Product Perspective
This is a completely new product, so the entire ecosystem will be created from scratch.



    5. 
User Classes and Characteristics

![alt_text](images/UserClassesandCharacteristics.png "image_tooltip")




    6. 
Operating Environment
The operating environment will only cover users located in Mexico. The servers used will be those in the AWS cloud. For non-relational databases MongoDB will be used, and for relational databases the platform will operate on MySQL with Apache dependencies.  



    7. 
Design and Implementation Constraints
For the development, the major constraint considered is the time, as there are only 10 weeks left for the implementation of the platform, Database, APIs, and domain. According to the marketing firm _Wishpond_, a Web Agency composed of full time engineers with higher seniority, would take over 3 months to develop a project of this magnitude (2022). 



    8. 
Assumptions and Dependencies
Some dependencies include various APIs used for payment processing, Mexican ID (INE card) validation and drivers’ license validation. Another major dependency is AWS services for our database. Other external dependencies that the user requires are tax documents, insurance documents, circulation card, plate registration, proof of address, vehicle bill and purchase tax.



3. 
System Features

## Functional requirements


<table>
  <tr>
   <td colspan="3" ><strong>Account Processing</strong>
   </td>
  </tr>
  <tr>
   <td colspan="3" >Account Creation
   </td>
  </tr>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Requirements</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Register clients
   </td>
   <td>Create the customer account creation system
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Register users with specialized roles
   </td>
   <td>Create the account creation system for users with the roles of super admin, automotive group, managers and salesmen
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Verify users
   </td>
   <td>Verify that the user and password match, so they can have access to the system
   </td>
  </tr>
  <tr>
   <td colspan="3" >Account Management
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Assign privileges
   </td>
   <td>Allow the super admin account to grant privileges to the other specialized roles
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Modify privileges
   </td>
   <td>Allow super admin account, automotive group, and managers to override the corresponding privileges
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Delete accounts
   </td>
   <td>Allow super admin account, automotive group and managers to delete the corresponding accounts
   </td>
  </tr>
</table>



<table>
  <tr>
   <td colspan="3" ><strong>Utility Functions</strong>
   </td>
  </tr>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Requirements</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Functionality to purchase a car
   </td>
   <td>Display the bank accounts of the corresponding agency, along with instructions for making the transfers
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Upload documents
   </td>
   <td>The platform allows uploading PDF files
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Save certain documents
   </td>
   <td>The platform allows saving the agency’s files
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Test drive appointments
   </td>
   <td>The platform allows creating test drive appointments
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>Chatbot
   </td>
   <td>The platform has a chatbot functionality for immediate communication and assignment of a salesperson if required
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>Personalize test
   </td>
   <td>The platform will have the option of a personalized test by means of questions to give an adequate answer to the needs of each client
   </td>
  </tr>
  <tr>
   <td>13
   </td>
   <td>Various filters
   </td>
   <td>Different customizations and car searches will have filters for the correct organization and user convenience
   </td>
  </tr>
</table>



<table>
  <tr>
   <td colspan="3" ><strong>Users special requirements</strong>
   </td>
  </tr>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Requirements</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td colspan="3" >Agency
   </td>
  </tr>
  <tr>
   <td>14
   </td>
   <td>Update information
   </td>
   <td>Make changes in the car catalog and in existing promotions
   </td>
  </tr>
  <tr>
   <td>15
   </td>
   <td>View insights
   </td>
   <td>Visualize insights on the best-selling cars, the best promotions and customer flow
   </td>
  </tr>
  <tr>
   <td colspan="3" >Managers
   </td>
  </tr>
  <tr>
   <td>16
   </td>
   <td>Update information
   </td>
   <td>Make changes in the car catalog and in existing promotions
   </td>
  </tr>
  <tr>
   <td colspan="3" >Sellers
   </td>
  </tr>
  <tr>
   <td>17
   </td>
   <td>View information
   </td>
   <td>Display order status, customer information, handling appointments, catalog and promotions
   </td>
  </tr>
</table>



<table>
  <tr>
   <td colspan="3" ><strong>Security</strong>
   </td>
  </tr>
  <tr>
   <td colspan="3" >Interface security
   </td>
  </tr>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Requirements</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>18
   </td>
   <td>Sanitize the entries
   </td>
   <td>Sanitize the information entered into the platform by external parties before passing it on to the following process
   </td>
  </tr>
  <tr>
   <td colspan="3" >Database security
   </td>
  </tr>
  <tr>
   <td>19
   </td>
   <td>Encrypt account credentials
   </td>
   <td>Store the credentials (username and password) of the platform users in encrypted form
   </td>
  </tr>
</table>



## Non-functional requirements


<table>
  <tr>
   <td colspan="3" ><strong>User interface</strong>
   </td>
  </tr>
  <tr>
   <td colspan="3" >Design
   </td>
  </tr>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Requirements</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Using color schemes
   </td>
   <td>Use monochromatic, achromatic and neutral color schemes
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Use legible fonts and the chosen typeface
   </td>
   <td>Maintain the Koho typeface and a size larger than 12 point
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Use icons, buttons and other interactive inputs
   </td>
   <td>Maintain a minimalist iconography standard and keep reactive elements
   </td>
  </tr>
  <tr>
   <td colspan="3" >UX
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Maintain a hyperlinked navigation bar at all portals
   </td>
   <td>Display a browser with the accesses to the main portals
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Using help-text and alt-text in buttons and images
   </td>
   <td>Show accessibility text in all filters and relevant information
   </td>
  </tr>
</table>



<table>
  <tr>
   <td colspan="3" ><strong>Standardization</strong>
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Apply the relevant measures of the ISO/IEC/IEEE 29148 standard
   </td>
   <td>Maintain standards that apply to our project
   </td>
  </tr>
</table>



## Use cases

The following section presents the use case diagrams, which logically describe the operation of the system and the interactions between the user and the application. Below are the use case diagrams that describe in a general way the system in two levels of depth.


![alt_text](images/CaseUseL0.png "image_tooltip")


Case use of the system - Level 0


![alt_text](images/CaseUseL1.png "image_tooltip")


Use case of the system - Level 1 Selling Platform


![alt_text](images/CaseUseL1Man.png "image_tooltip")


Use case of the system - Level 1 Management platform


![alt_text](images/CaseUseL1Acc.png "image_tooltip")


Use case of the system - Level 1 Account Processing


![alt_text](images/CaseUseL1Sec.png "image_tooltip")


Use case of the system - Level 1 Security


## Activity Diagrams

Below are the activity diagrams for each of the actions that can be performed by the user within the platform. In this way, the main objective is to concretely capture the operation of the processes that constitute the application, thus having greater control and organization at the time of evaluating or contemplating a rethinking in its line of operation


![alt_text](images/ADacc.png "image_tooltip")


Create account


![alt_text](images/ADlog.png "image_tooltip")


Login


![alt_text](images/ADHome.png "image_tooltip")


Home page


![alt_text](images/ADbuy.png "image_tooltip")


Buy car page


![alt_text](images/ADappo.png "image_tooltip")


Schedule driving appointment page


![alt_text](images/ADchatbot.png "image_tooltip")


Chatbot page


![alt_text](images/ADchatbot.png "image_tooltip")


Custom test page


![alt_text](images/ADtestpage.png "image_tooltip")


Associates page


![alt_text](images/ADacc.png "image_tooltip")


About us page


![alt_text](images/ADaboutus.png "image_tooltip")


Main administration page


![alt_text](images/ADadmin.png "image_tooltip")


Administration driving test appointment page


![alt_text](images/ADtestappont.png "image_tooltip")


Administration catalog page


![alt_text](images/ADadmcatalog.png "image_tooltip")


Administration promotions page


![alt_text](images/ADadmpromotions.png "image_tooltip")


Agency statistics page


## Architecture diagram


![alt_text](images/SW_Architecture.png "image_tooltip")


Software Architecture



    9. 
Custom test


        1. 
Description

    We will provide the option to perform a customized test to show a suitable option for the customer’s needs. This feature is of medium priority.



        2. 
Stimulus/Response Sequences

    Here are the possible test questions and how the customer interaction will look like.


    
![alt_text](images/test0.png "image_tooltip")



    
![alt_text](images/test1.png "image_tooltip")



    
![alt_text](images/test2.png "image_tooltip")



    
![alt_text](images/test3.png "image_tooltip")



    
![alt_text](images/test4.png "image_tooltip")



    
![alt_text](images/test5.png "image_tooltip")



    
![alt_text](images/test6.png "image_tooltip")



    
![alt_text](images/test7.png "image_tooltip")



    
![alt_text](images/test8.png "image_tooltip")



    
![alt_text](images/test9.png "image_tooltip")



    This dynamic corresponds to the use case corresponding to the test mentioned above.



# Functional Requirements
This feature corresponds to the 12 functional requirement mentioned above.


<table>
  <tr>
   <td>12
   </td>
   <td>Personalize test
   </td>
   <td>The platform will have the option of a personalized test by means of questions to give an adequate answer to the needs of each client
   </td>
  </tr>
</table>




# Data Requirements


## Logical Data Model

![alt_text](images/software_planning.png "image_tooltip")




## Reports
The platform will provide reports for different types of users. For the Super Admin, a personalized dashboard where they can modify the time parameters and specific pages they want to analyze will be shown. These parameters may include HTTP Error Percentage, and both Logged and Thrown Exceptions. They are especially useful for the maintenance of the web application, as well as for the user perception consideration. The Super Admin may also see an Apdex Score per process for all users, and the Agency Managers may as well see this score, but only for the selling process and the invested time of potential buyers on their specific brand. 

For the Agencies, they will also be able to view a personalized dashboard with personalized data sets, including the interpretation of their most common buyers’ profile and preferences, as well as information regarding the performance of the Salesmen and Managers, including specified details on average response time to customers, information approval, and a customer’s preference comparative, analyzing budget vs liking’s. 



## Data Acquisition, Integrity, Retention, and Disposal
The table below specifies the logical process for each user and their inputs or outputs.


<table>
  <tr>
   <td><strong>User</strong>
   </td>
   <td><strong>Input</strong>
   </td>
   <td><strong>Process</strong>
   </td>
   <td><strong>Output</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="3" ><strong>Buyer</strong>
   </td>
   <td>Email, name, username, password.
   </td>
   <td>The system creates an account with the data given and sends it encrypted for storage in the DB.
   </td>
   <td>Email notification of successful account creation.
   </td>
  </tr>
  <tr>
   <td>INE, Driver license as photos.
   </td>
   <td>Send the photos to the API that reads them to extract information as name, address, Citizen ID, CIC. Then it is sent to a verifier API (third party) and evaluates them to see if they are valid. If it's valid, we dispose of the photos and information and change the user status in DB to “valid IDs”. In case it is not valid, we also dispose of the data and ask the user to re-take the photo.
   </td>
   <td>An email to the user account saying that the validation has been successful.
   </td>
  </tr>
  <tr>
   <td>Specific documents required by each agency to start the process of buying a car.
   </td>
   <td>We store them temporarily and send them to a salesman of the agency to download and evaluate them. Once the salesman has approved the documents, we dispose of them.
   </td>
   <td>When the salesman approves the docs, we send an email notification of the event.
   </td>
  </tr>
  <tr>
   <td rowspan="2" ><strong>Agency</strong>
   </td>
   <td>Assign and remove manager’s accounts
   </td>
   <td>Ability to assign and remove the role of manager
   </td>
   <td>Notification in the system when the role was assigned successfully or when the role was removed 
   </td>
  </tr>
  <tr>
   <td>Update information for the catalogue and the promotions
   </td>
   <td>The system allows you to change the database information for the catalog and promotions
   </td>
   <td>Notify when changes have been made and indicate whether they were successful or unsuccessful
   </td>
  </tr>
  <tr>
   <td rowspan="2" ><strong>Manager</strong>
   </td>
   <td>Assign and remove seller’s account
   </td>
   <td>Ability to assign and remove the role of seller
   </td>
   <td>Notification in the system when the role was assigned successfully or when the role was removed 
   </td>
  </tr>
  <tr>
   <td>Update information for the catalogue and the promotions
   </td>
   <td>The system allows changing the database information for the catalog and promotions
   </td>
   <td>Notify when changes have been made and indicate whether they were successful or unsuccessful
   </td>
  </tr>
  <tr>
   <td><strong>Salesman</strong>
   </td>
   <td>Change the status of orders and appointments
   </td>
   <td>The system allows changing the database information for the status of orders and appointments
   </td>
   <td>Notify when changes have been made and indicate whether they were successful or unsuccessful
   </td>
  </tr>
  <tr>
   <td><strong>SuperAdmin</strong>
   </td>
   <td>Assign and remove agency’s account
   </td>
   <td>Ability to assign and remove the role of agency
   </td>
   <td>Notification in the system when the role was assigned successfully or when the role was removed
   </td>
  </tr>
</table>




# External Interface Requirements


## User Interfaces
The user interface will have various aspects to help provide the best user experience, starting with a monochromatic, achromatic, and neutral color scheme. The platform will also use a legible font size and typeface to attract and hold users attention, using KoHo typeface and a size larger than 12 point. This program will also use buttons, icons and other interactive elements, therefore, a minimalist iconography standard must be kept next with reactive elements. 

For UX, the web app will display a browser with access to the main portals through a hyperlinked navigation bar at all portals, as well as showing accessibility text in all filters and relevant information by using help-text and alt-text in buttons and images. Next are some early prototypes examples:


![alt_text](images/1.png "image_tooltip")

![alt_text](images/2.png "image_tooltip")



![alt_text](images/3.png "image_tooltip")

![alt_text](images/4.png "image_tooltip")




### Software Interfaces
For the application, the decision was made to use React.js as the front-end, as its simple syntax allows other developers to easily integrate into the project and work alongside the pre-existing development team. It allows for reusable components to keep the code clean and DRY. React is infamous for creating rich UI, supporting other front-end libraries such as Bootstrap or Material UI, as well as having a very strong community support. Regarding the choice of front-end libraries there are many options, the two most popular being Bootstrap 4 or Material UI, however it was concluded that the complete design will be originally created by the front-end developers.

For the back-end, Node.js will be used due to its easy integration with React applications, as well as for its efficiency and flexibility for building fast and scalable applications. Node.js is very good for building serverless and microservice-based applications due to its flexibility.

Two databases will be used, a relational and a non-relational. The first being MySQL, which will store the user’s information as well as the catalog for the agencies. The second one, MongoDB, will be used to store all interactions and cost relations. Node.js will be used in order to connect these two databases and the front-end in order for them to communicate with each other.



### Hardware Interfaces
Regarding hardware, the only hardware any user requires is a computer or a mobile device (smartphone or tablet) with the ability to connect to the internet.



### Communications Interfaces
Important notifications to customers will be via email, when an order is created, when a driving appointment is made, when any part of the purchase is completed and at the end of the purchase process. Communication with the chatbot will be encrypted and limited to once the chat is closed, the conversation will be deleted. Other means of communication will already be the choice of the customer and the sellers, via email or telephone.



## Quality Attributes


 
### Usability
The platform is designed to support and embrace lots of information. However, when selling something, simplicity is key. In such a way, the web-app foresees making a simple platform with high interactivity. This would be ensured by making it easy to decipher and explore. The easiest way of making this is through a proper taxonomy, hence making it a simple structure.

As well, the webpage is meant to have a high efficiency, as buyers should be able to visualize the cars they are interested in either after completing the “personality test”, or after searching the models they would like to own. A different way to provide an efficient experience for the users would be for the customer to be able to navigate from one place to another in less than three steps. Continuously, adding a Breadcrumb Navigation where buyers could go back to the different options they have seen, and jump a step back if they missed a step would help the final client to find it easier to use the app.

Some platform pages, such as the Login, Registry, Tests, Chatbot, and Settings would maintain traditional formatting to make it easier for the user to interact with the page without needing to put too much thought into it. Additionally, a “tips” functionality in the navigation system for the buyer that could be turned on and off could help to have a more complete and inclusive experience. To complement this, a FAQ section for handling potential user errors would enhance the UX.



### Performance
The designed platform would include for the Super Admin an administrative view in which an Apdex Score of each process would be shown. The evaluation of the satisfactory performance would equate to an average or above average time in each process. Regarding the buyers, it would be evaluating the time they took to complete the test, as well as how long it took to choose a vehicle. For the agencies’ managers and sellers, the main evaluation would be surrounding assignment and distribution of tasks.

The whole system works on the AWS Cloud to make it more accessible for the development team to focus on product development. Continuously, by maintaining the architecture serverless, the managed services (DB and APIs) would operate at cloud level. 

As one-dimensional qualities, some important features would be the measurement of response time, and the ability to work properly on different operating systems (iOS, Android, Linux, Windows, Mac) with adequate display distributions and low-battery consumption. Therefore, URL redirects will be avoided as they cause delays for mobile users. In order to keep the platform functioning without consuming several resources, the number of DOM elements is needed to stay slightly below, 13000 (average according to Httparchive.org). An additional element would be reducing DNS lookups, as they have a larger cost on mobile networks. To follow up, using a CDN would be optimal to reduce latency and improve performance.



### Security
The platform’s security would include user authentication on the login through the validation of credentials (password and username). This data will be kept on the MySQL DB as protected information. For validation purposes, when an account is recently registered, access authorization will be required via email. An asymmetric PKI environment could be configured for the optimization of the security processes. This environment would use cryptographic keys for the exchange of information between buyers and sellers.

This environment would be supported by the IETF standardized SSL protocol, which protects the communication channel through the multistep transactions (constant exchange of information). Application level security would be needed to complement the previous protocol. This would work through XML Encryption, which defines the way in which data is encrypted and decrypted, but specifically through XML Signature, providing security to the private document exchange and signature.



    20. 
Safety

<table>
  <tr>
   <td><strong>ID</strong>
   </td>
   <td><strong>Risk</strong>
   </td>
   <td><strong>Phase</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Mitigation action</strong>
   </td>
   <td><strong>Owner</strong>
   </td>
   <td><strong>Likeli- hood</strong>
   </td>
   <td><strong>Impact</strong>
   </td>
  </tr>
  <tr>
   <td colspan="8" >Design Risks
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Non-compliance of functional requirement
   </td>
   <td>Phase  1 - 4
   </td>
   <td>It is not possible (for technical reasons) to meet a functional requirement in a timely manner
   </td>
   <td>Reassign more work force from non functional requirements implementation to complete the requirement. Otherwise extend the deadline.
   </td>
   <td>Alexa
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Unexpected change in dependencies y licenses
   </td>
   <td>Phase  1 - 4
   </td>
   <td>Any unforeseen modification in the software licenses of the project's dependencies modifies their use or requires replacement
   </td>
   <td>Seek for oher dependencies that could be used. While on it use reassign the workers to other parts to not completely stop the development.
   </td>
   <td>Alexa
   </td>
   <td>High
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Scope deviation
   </td>
   <td>Phase 2 - 3
   </td>
   <td>Time is spent on tasks outside the scope of the project
   </td>
   <td>Prioritize functional tasks
   </td>
   <td>Andrea
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>Incompatibility between requirements
   </td>
   <td>Phase 1 - 2
   </td>
   <td>Two requirements are not compatible because of the way or time in which they were developed
   </td>
   <td>Prioritize the requirement in terms of its importance and functionality in the phase we are in, and modify the other to be compatible
   </td>
   <td>Alexa
   </td>
   <td>High
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>5
   </td>
   <td>Non-standard design
   </td>
   <td>Phase 2 - 3
   </td>
   <td>There is a misalignment between the design and theme of the user interface screens
   </td>
   <td>Have a preview design with the right sizes
   </td>
   <td>Andrea
   </td>
   <td>Mid
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>Unreliable features
   </td>
   <td>Phase 2 - 3
   </td>
   <td>Some functionality does not respond as required in spite of repair attempt
   </td>
   <td>Quick response to fix it or delete the feature
   </td>
   <td>Alexa
   </td>
   <td>Mid
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td colspan="8" >Team Risks
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>Off schedule
   </td>
   <td>Phase 1 - 4
   </td>
   <td>Having many off schedule assignments
   </td>
   <td>Assign more team members to off-schedule tasks and extend delivery date
   </td>
   <td>Andrea
   </td>
   <td>Mid
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>Team member sickness or leaving
   </td>
   <td>Phase 1 - 4
   </td>
   <td>One team member leaves the project or cannot work for personal reasons
   </td>
   <td>Assign more work load to other team members and increase their payment. Seek for more team members or external help.
   </td>
   <td>Andrea
   </td>
   <td>Mid
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>9
   </td>
   <td>Training in new technologies
   </td>
   <td>Phase 2 - 3
   </td>
   <td>Too much time is spent on learning new development tools
   </td>
   <td>Choosing a known tech stack for the project
   </td>
   <td>Andrea
   </td>
   <td>Low
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>Data theft
   </td>
   <td>Phase 4
   </td>
   <td>Theft of project information (code or documentation) occurs due to malicious mischief by another developer
   </td>
   <td>Implement high security standards and protocols of recovering information
   </td>
   <td>Alexa
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td colspan="8" >Coding Risks
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>Bug infestation
   </td>
   <td>Phase 3
   </td>
   <td>More bugs than expected 
   </td>
   <td>Stop the development of non functional requirements. Send that work force to correction of bugs.
   </td>
   <td>Tonatiuh and Alfredo
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>Test cases failure
   </td>
   <td>Phase 3
   </td>
   <td>The code is not functioning as it should due to failed test cases
   </td>
   <td>Check for errors and fix code
   </td>
   <td>Alfredo
   </td>
   <td>High
   </td>
   <td>Mid
   </td>
  </tr>
  <tr>
   <td>13
   </td>
   <td>Version management error
   </td>
   <td>Phase 2
   </td>
   <td>There is a conflict between versions that generates losses or incompatibility in the code
   </td>
   <td>Have a backup version and restore that version
   </td>
   <td>Tonatiuh
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>14
   </td>
   <td>Bad coding practices
   </td>
   <td>Phase 2
   </td>
   <td>Software can be unpredictable, team can struggle to work and understand, bugs and errors can be more complicated to fix
   </td>
   <td>Follow best practices when writing code, DRY, modularize.
   </td>
   <td>Tonatiuh
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>15
   </td>
   <td>A cyber-attack may occur
   </td>
   <td>Phase 4
   </td>
   <td>The system is breached
   </td>
   <td>According to the attack, have a plan to recover lost servers or data
   </td>
   <td>Alfredo
   </td>
   <td>Mid
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td colspan="8" >DB, webpage, domain, server APIs Risks
   </td>
  </tr>
  <tr>
   <td>16
   </td>
   <td>Non-functioning APIs
   </td>
   <td>Phase 2
   </td>
   <td>APIs are not functioning due to being outdated or bad compatibility
   </td>
   <td>Testing API calls and checking for major updates. 
   </td>
   <td>Alfredo
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>17
   </td>
   <td>DB bad management
   </td>
   <td>Phase 2
   </td>
   <td>In implementing the DB mistakenly erase data, tables
   </td>
   <td>Keeping a backup of working DB versions and restore in case
   </td>
   <td>Tonatiuh and Alfredo
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
  <tr>
   <td>18
   </td>
   <td>Insufficient server capacity
   </td>
   <td>Phase 2-3
   </td>
   <td>Due to changes in implementation, the first server configuration may be insufficient
   </td>
   <td>Increase the infrastructure
   </td>
   <td>Tonatiuh
   </td>
   <td>Mid
   </td>
   <td>Low
   </td>
  </tr>
  <tr>
   <td colspan="8" >External Risks
   </td>
  </tr>
  <tr>
   <td>19
   </td>
   <td>Loss of information
   </td>
   <td>Phase 1-4
   </td>
   <td>Loss of project information (code or documentation) occurs due to physical loss of equipment
   </td>
   <td>Use automatic updates in the workspaces and keep a backup of the vital information 
   </td>
   <td>Alfredo
   </td>
   <td>Low
   </td>
   <td>High
   </td>
  </tr>
</table>




7. 
Internationalization and Localization Requirements
The current project does not intend to operate anywhere but in Mexico. All the information that will be solicited to the buyers will be only designed to follow the country’s regulations and legal standards.



8. 
Other Requirements
In Mexico, the Federal Law for the Protection of Personal Data Held by Individuals regulates the handling and treatment of data of any physical and moral person. It is necessary to adhere to the regulations that ensure that this human right (Art. 16) is respected.

**Appendix A: Glossary**

DB.- Database: Used to store information, usually in tables. It can be relational or not, this defines how you can search for information and how you store it.

Application.- A software implementation that stores, processes and manipulates data. With the goal of getting specific results.

API.- Application Programming Interface: Software that enables the communication between two applications.

Domain.- Direction (name) which you can use to access specific pages on the web.

CIC.- Credential Identification Code

AWS.- Amazon Web Services

DNS.- Domain Name System

DOM.- Document Object Model

CDN.- Content Delivery Network

FAQ.- Frequently Asked Questions

UX.- User Experience

PKI.- Private Key Infrastructure

IETF.- Internet Engineering Task Force

SSL.- Secure Socket Layer
