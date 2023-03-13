# Pagination Components Introduction

SSPaging provides pagination components that is a higher level layer of the library. It provides ready-to-use components to work with SSPaging in very simple way. These components offer nearly zero configuration to run pagination and seamlessly integrated with SSPaging core functionality.

## Features
Pagination components offer almost all elements that needed by SSPaging with the following features:
- ### Integrated
All SSPaging components are fully integrated, so you do not need to worry about how to handle pagination. 
- ### Unlimited
SSPaging components can have multiple instance since it uses props to connect to your SSPaging instance. It means you can use the same SSPaging components more than one in the same page even with different instance.
- ### Nearly Zero Config
Since pagination components have been designed to work as best as possible with SSPaging, they need almost no configuration.
- ### Customizable
SSPaging components currently provides fully customizable CSS classes for `Navigator` and `SelectRow` components.

## How-it-works
SSPaging components can be used locally via module or globally via `app.component()` option. For use without build tool, you can only use global version of the components.

## Available components
SSPaging provides three components you can use in your project. They are `SelectRow`, `Navigator` and `SearchBox`. We do not provide table as it is a very flexible element that should be customized with your data. Also, using SSPaging in a table only needs basic `v-for` loop and does not have any special treatment.