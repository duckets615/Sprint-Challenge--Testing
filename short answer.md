# Please answer the following questions

1.  In Jest, what are the differences between `describe()` and `it()` globals, and what are good uses for them?
    Describe() defines the testing suite function whereas it() describes the test assertion itself.
    One would use describe() to define a whole suit of related tests. It's useful for organizational purposes.
    One would use it() when testing some functionality of the code.


2.  What is the point of `Test Driven Development`? What do you think about this approach?
     - Test Driven Developement is a way of developing robust, sustainable, applications by developing the application simultaneously with developing tests. This will give you some parameters to use for your project that can act like a framework, This will help cutdown on the number of bugs when changes are made in the future. Personally, I get alot of bugs in my code so this is something that should help me out.


3.  What are `mocks`? What are a good use cases for them?
    - `mocks` are simulations of real data that give you problems when testing b/c data is either too big, too complex, or otherwise untestable for a testing environment. A case in which you'd want to use mocks would be you when a database is huge, so rather test the db, you'd use a javaScript object to work with.


4.  Mention three types of automated tests.
    - Unit Testing,
    - Functional Testing,
    - Regression Testing.
