Feature: Search For

  Scenario Outline: As a user, I can search for any product

    Given I am on the main page
    When I search for <search>
    Then I should see a list of all the related products and create a txt file

    Examples:
      | search |
      | camisetas | 
