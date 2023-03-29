# Index

[**Index**](#index)

[**Introduction**](#introduction)

[**Testing Objectives**](#testing-objectives)

[**Tests Plan**](#tests-plan)

[Unit testing React](#unit-testing-react)

[Unit testing Node.js](#unit-testing-nodejs)

[Truthiness](#truthiness)

[String matchers](#string-matchers)

[**Black box tests**](#black-box-tests)

[**Integration tests**](#integration-tests)

[**White box - Basic pathway**](#white-box---basic-pathway)

[**White box - Coverage**](#white-box---coverage)

[Case 1 - Recommend blue car](#case-1---recommend-blue-car)

[Case 1-A - Recommend blue sedan using filter](#case-1-a---recommend-blue-sedan-using-filter)

[Case 2 - Buy a red SUV](#case-2---buy-a-red-suv)

[Case 3 - Get cars by agency](#case-3---get-cars-by-agency)

[Case 4 - Select agency with selected car](#case-4---select-agency-with-selected-car)

[**Static Tests**](#static-tests)

[Walkthrough](#walkthrough)

[User manual](#user-manual)

[**Testing Strategy**](#testing-strategy)

[Informal Testing](#informal-testing)

[Unity Testing](#unity-testing)

[Unity Testing - Back Box](#unity-testing---black-box)

[Unity Testing - White Box](#unity-testing---white-box)

[Integration Testing](#integration-testing)

[**Test Execution**](#test-execution)

[Roles Expectations](#roles-expectations)

[Test Environment](#test-environment)

[Test schedule](#test-schedule)

[Conclusion](#conclusion)

[Appendix](#appendix)

[**Test Report Format**](#test-report-format)

#


#


# Introduction

This document has been created to provide with all the necessary information about the web application in relation to the tests that will be performed, including the types of testing available, best practices, and tools that can be used. With the growth of web applications and the increasing importance of online services, it's critical to ensure that your web application is reliable, secure, and performs well.

Testing a web application can be a complex process, requiring a comprehensive approach that covers various aspects such as functionality, usability, security, and performance. This document will guide you through the entire testing process, from planning and designing tests to executing and analyzing test results. We'll cover different testing techniques such as functional testing, security testing, and usability testing, providing you with a comprehensive understanding of our web application.

# Testing Objectives

Our objectives are to ensure the product meets functional requirements, identify defects and bugs, ensure the product is user-friendly and ensure the product is secure and free from vulnerabilities.

# Tests Plan

## Unit testing React

We will use react unit tests for each function, like the following example.

describe('Test for name function',()=\>{

it('Should return...',()=\>{

expect(name(45)).toBe("correct")

})

})

The idea of testing our components is to first test that these components render without errors and also that the business logic that these components must perform executes successfully, with this in mind we will be using Enzyme in conjunction with Jest.

importAppfrom'../src/App'

import{shallow}from'enzyme'

describe('Tests for ... of the app',()=\>{

it('Itshould...',()=\>{

constwrapper=shallow(\<App/\>)

expect(wrapper.find('#counter-title').text().includes('0')).toBe(true)

wrapper.find('#counter-substract-button').simulate('click')

expect(wrapper.find('#counter-title').text().includes('-1')).toBe(true)

wrapper.find('#counter-substract-button').simulate('click')

expect(wrapper.find('#counter-title').text().includes('-2')).toBe(true)

})

})

## Unit testing Node.js

Jest will be used for testing Node.

## Truthiness

This is used for null, falsy and truthy i.e. false and true values. Anything that is not logically true is falsy. Number 0, null, empty string, NaN are all examples of falsy concerning JavaScript.

test("truthy operators",()=\>{

varname="Software testing help"

varn=null

expect(n).toBeNull()

expect(name).not.toBeNull

// name has a valid value

expect(name).toBeTruthy()

//fail - as null is non success

expect(n).toBeTruthy()

// pass - null treated as false or negative

expect(n).toBeFalsy()

// 0 - treated as false

expect(0).toBeFalsy()

})

## String matchers

This provides matches for strings to be matched against a regular expression.

test("string matchers",()=\>{

varstring1="software testing help - a great resource for testers"

// test for success match

expect(string1).toMatch(/test/);

// test for failure match

expect(string1).not.toMatch(/abc/)

})

# Black box tests

| Test Scenario ID | Login | Test CaseID | Login - 1A |
| --- | --- | --- | --- |
| Test Case description | Login - Positive test case | Test priority | High |
| Pre-Requisite | NA | Post-Requisite | NA |

| Test Execution Steps: | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Actual Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/login | Login page | Login page | Chrome | Pass | Lauch successful |
| 2 | Enter valid email and a valid password and hit login button | Email: [valid@gmail.com](mailto:valid@gmail.com)Password:validpass | Successfully login in! | Successfully login in! | Chrome | Pass | Valid login attempt |

##


##


| Test Scenario ID | Login | Test CaseID | Login - 1B |
| --- | --- | --- | --- |
| Test Case description | Login - Negative test case | Test priority | High |
| Pre-Requisite | NA | Post-Requisite | NA |

##


| Test Execution Steps: | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Actual Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/login | Login page | Login page | Chrome | Pass | Launch successful |
| 2 | Enter incorrect email and an incorrect password and hit login button | Email: incorrect[@gmail.com](mailto:valid@gmail.com)Password:incorrectpass | The email address or the password that you've entered doesn't match any account. Sign up for an account | The email address or the password that you've entered doesn't match any account. Sign up for an account | Chrome | Pass | Incorrect login attempt stopped |
| 3 | Enter valid email and an incorrect password and hit login button | Email: [valid@gmail.com](mailto:valid@gmail.com)Password: incorrectpass | The password that you've entered is incorrect.Forgotten password? | The password that you've entered is incorrect.Forgotten password? | Chrome | Pass | Incorrect login attempt stopped |

##


| Test Scenario ID | Create account | Test CaseID | Create account - 1 |
| --- | --- | --- | --- |
| Test Case description | Create account - Positive test case | Test priority | High |
| Pre-Requisite | NA | Post-Requisite | NA |

##


| Test Execution Steps: | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Actual Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/createAccount | Create account page | Create account page | Chrome | Pass | Launch successful |
| 2 | Enter valid name, email and a valid password and hit create button | Name: Valid nameEmail: [valid@gmail.com](mailto:valid@gmail.com)Password:validpass | Your account has been successfully created! | Your account has been successfully created | Chrome | Pass | Valid create account attempt |

##


| Test Scenario ID | Create account | Test CaseID | Create account - 1 |
| --- | --- | --- | --- |
| Test Case description | Creste account - Negative test case | Test priority | High |
| Pre-Requisite | NA | Post-Requisite | NA |

##


| Test Execution Steps: | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Actual Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/createAccount | Create account page | Create account page | Chrome | Pass | Launch successful |
| 2 | Enter a valid name, incorrect email and a valid password and hit login button | Name: Valid nameEmail: incorrect[@gmail.com](mailto:valid@gmail.com)Password:validpass | The email address that you've entered doesn't match any valid email. Try again. | The email address that you've entered doesn't match any valid email. Try again. | Chrome | Pass | Incorrect create account attempt |
| 3 | Enter valid name, email and an incorrect password and hit create button | Name: Valid nameEmail: valid[@gmail.com](mailto:valid@gmail.com)Password:incorrectpass | The password that you've entered doesn't meet the right parameters. Try again. | The password that you've entered doesn't meet the right parameters. Try again. | Chrome | Pass | Incorrect create account attempt |

# Integration tests

# White box - Basic pathway

An example of basic pathway testing would be from the moment the user creates an account until the moment the user buys their desired vehicle.

# White box - Coverage

## Case 1 - Recommend blue car

| Test Execution Steps: | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/home | NDS Cars home page | Chrome | Pass | Launch successful |
| 2 | Click on URL in Chatbot | https://ndscars.com/test | NDS Cars test page | Chrome | Pass | Launch successful |
| 3 | Select desired car properties and blue color option | Color: Blue | Recommended blue vehicles | Chrome | Pass | The search successful |

## Case 1-A - Recommend blue sedan using filter

| Test Execution Steps: | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/home | NDS Cars home page | Chrome | Pass | Launch successful |
| 2 | Select the browser | - Color: Blue - Type: Sedan | NDS Cars page | Chrome | Pass | The search was successful |
| 3 | Select desired car | Blue Sedan | Blue sedan page | Chrome | Pass | The search was successful |

## Case 2 - Buy a red SUV

| Test Execution Steps: | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/home | Create home page | Chrome | Pass | Launch successful |
| 2 | Select the browser | - Color: Red- Type: SUV | A list of the available red SUV's | Chrome | Pass | The search was successful |
| 3 | Select desired vehicle | Selected red SUV | Red SUV page | Chrome | Pass | The search was successful |

## Case 3 - Get cars by agency

| Test Execution Steps: | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/home | Create home page | Chrome | Pass | Launch successful |
| 2 | Select the browser | Desired agency | A list of the all the available vehicles from the agency | Chrome | Pass | The search was successful |
| 3 | Select desired vehicle | Selected vehicle | Selected vehicle page | Chrome | Pass | The search was successful |

## Case 4 - Select agency with selected car

| Test Execution Steps: | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- |
| No. | Action | Inputs | Expected Output | Test Browser | Test Result | Test Comments |
| 1 | Launch application | https://ndscars.com/home | Create home page | Chrome | Pass | Launch successful |
| 2 | Select the browser | Any | A list of the available vehicles | Chrome | Pass | The search was successful |
| 3 | Select desired vehicle | Selected vehicle | Selected vehicle page | Chrome | Pass | The search was successful |
| 4 | Select desired agency | Desired agency | Selected vehicle page | Chrome | Pass | The search was success |

# Static Tests

## Walkthrough

The software will be run sequentially to determine the quality of the product and to discover possible defects. Following the next steps:

1. Enter the NDS Cars home page.
2. Create an account
3. Enter valid email and create a valid password
4. Search for desired vehicle through personalized test, searching all vehicles or get vehicles by filtering search
5. Select desired vehicle
6. Purchase vehicle through desired agency or schedule test drive appointment
7. Process done

## User manual

Upon completion of the platform, a user manual will be created for both clients and administrative members of the agencies.

# Testing Strategy

## Informal Testing

- **PURPOSE** : Informal testing allows testing without a plan or a fixed objective, it is based on intuition and skills of the developer who performs them.
- **METHOD** : It is tested by creating different information scenarios for the functions to evaluate.
- **MITIGATION** : Any unit testing will be implemented.
- **TESTERS** : Each developer that creates a function or a component.
- **TIMING** : When a function/component is created.

## Unity Testing

- **PURPOSE** : Use unit testing will allow each part of the system to be tested. Also helps us find errors or bugs in the code.
- **METHOD** : JavaScript and React libraries.
- **MITIGATION** : White box cover testing will be implemented.
- **TESTERS** : Each developer that creates a function or a component.
- **TIMING** : When a function/component passes the informal tests.

## Unity Testing - Back Box

- **PURPOSE** : We will use black box unit testing to test the inputs, outputs using positive and negative batteries of the results.
- **METHOD** : User stories, use cases, activity diagrams that need input-output sections only.
- **MITIGATION** : White box cover testing will be implemented.
- **TESTERS** : A group of developers.
- **TIMING** : When functional requirements and blocks of modules are finished.

## Unity Testing - White Box

- **PURPOSE** : We will use white box unit testing to test the possible cases of different system processes using positive and negative batteries of the results.
- **METHOD** : User stories, use cases, activity diagrams of all the sections of the system.
- **MITIGATION** : We will need to refactor the module that failed.
- **TESTERS** : A group of developers.
- **TIMING** : When functional requirements and blocks of modules are finished.

## Integration Testing

- **PURPOSE** : Integration testing will allow knowing if many modules work together and in the end if the complete software also works.
- **METHOD** : Bottom-top.
- **MITIGATION** : White box cover testing will be implemented.
- **TESTERS** : A group of developers.
- **TIMING** : When a block of modules is finished.

# Test Execution

## Roles Expectations

**TEST LEAD** : A test lead is responsible for directing the developers that are making the tests. It should take into consideration the necessities of all stakeholders to follow the requirements of the tests to deliver a product that fits the objectives, time and budget.

**DEVELOPMENT TEAM** : In this matter, they should follow the testing documentation, the format for the tests proposed by the test lead. Make sure the software is developed according to the required quality standards. They should make tests before, while and after the development is done.

## Test Environment

The testing environment will consist of a minimum windows environment, an intel i5, i7 and i9, 16 and 32 GB RAM, along with Google Chrome version 99 at minimum.

The application will be hosted through AWS instances.

All testers will have access to the same version of the database and all necessary software.

## Test schedule

![](RackMultipart20230315-1-jbm5hd_html_f1f6831014e170d4.png)

# Conclusion

An essential component of any project is testing. In order to be ready to test project features as we are implementing them, we have created the following testing strategy. This will help us manage resources effectively and ensure the quality of the final result. Testing is crucial for keeping our codebase up to date once the project is complete. If all the unit tests are already in place, upgrading and correcting the code will be much easier. Due to time restrictions, we will concentrate on the key features. Only functional unit testing on modules and databases has thus far been discussed. Due to the fact that we won't be testing the documentation, audits and static tests have been left out.

# Appendix

Version 0.1 - Monday 13

Version 0.2 - Tuesday 14

Version 0.3 - Wednesday 15

# Test Report Format

| Test Report: [Insert Test Name/Number] | | | | | 
| --- | --- | --- | ---- | --- |
| **Introduction** : In this section, provide a brief overview of the test, including its purpose and scope. | | | | |
| **Test objectives** | **Test approach** | **Test Environment** | **Test data** | **Test Results** |
| - | - | - | - | - |
| - | - | - | - | - |
| - | - | - | - | - |
| - | - | - | - | - |

| **Pass/Fail status** | **Defects/Bugs identified** | **Severity of each defect/bug** | **Steps taken to resolve defects/bugs** | **Any issues or challenges encountered during testing** |
| --- | --- | --- | --- | --- |
| - | - | - | - | - |
| - | - | - | - | - |
| - | - | - | - | - |
| - | - | - | - | - |
| **Conclusion** : In this section, summarize the test results and discuss any lessons. Include recommendations for future testing efforts. | | | | |
