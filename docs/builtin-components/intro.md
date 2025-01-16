# Pagination Components Introduction

SSPaging provides a set of pagination components that serve as a higher-level layer on top of the library. These components offer a simple and ready-to-use solution for integrating pagination with SSPaging, requiring minimal configuration. They are seamlessly integrated with the core functionality of SSPaging.

## Features

Pagination components offer almost all the elements needed by SSPaging, with the following key features:

- ### Integrated
  All SSPaging components are fully integrated, meaning you don’t need to worry about handling pagination logic. The components work together effortlessly out-of-the-box.
  
- ### Unlimited Instances
  SSPaging components can be used in multiple instances on the same page, as they rely on props to connect to the corresponding SSPaging instance. This means you can use the same components more than once, even with different instances.
  
- ### Nearly Zero Configuration
  Pagination components are designed to work optimally with SSPaging, requiring very little configuration. They are ready to go as soon as you include them in your project.
  
- ### Customizable
  All SSPaging components provide fully customizable CSS classes, allowing you to extend, customize, or even redesign them as needed.

## How It Works

SSPaging components can be used locally via a module or globally using the `app.component()` option. If you're not using a build tool, you can only use the global version of the components.

## Available Components

SSPaging provides three core components that you can use in your project:

- `SelectRow`  
- `Navigator`  
- `SearchBox`

Note that we do not provide a table component, as it is a highly flexible element that should be customized to fit your specific data. Using SSPaging with a table typically only requires a basic `v-for` loop and does not need any special handling.

