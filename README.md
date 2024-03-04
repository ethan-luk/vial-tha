# Vial Health Take Home Assignment 📝

Take home assignment for Vial Health Software Engineering Internship ✏️

View Application: https://ethan-luk.github.io/vial-tha/

## Features
- Fetch data from https://055d8281-4c59-4576-9474-9b4840b30078.mock.pstmn.io/subjects
- Displays subject data in a either table or grid format with responsive filtering and sorting capability
- Error handling for incorrect filter inputs (age, diagnosis date)
- Search bar to search for specific subjects by name
- Pagination to include a maximum of 10 subjects per page
- Dynamic Responsiveness to many screen sizes
- Visually appealing interface for seamless UI/UX experience

  
## Images

#### Table Display
<img width="500" alt="image" src="https://github.com/ethan-luk/vial-tha/assets/100002960/2fb029f7-d906-4d2a-868c-d6d59e0024db">
<img width="500" alt="image" src="https://github.com/ethan-luk/vial-tha/assets/100002960/8beb52d5-509a-4d22-9dd4-83c1b969b223">

#### Grid Display
<img width="500" alt="image" src="https://github.com/ethan-luk/vial-tha/assets/100002960/50ab6e14-41a3-472f-b464-c11858f9349b">
<img width="500" alt="image" src="https://github.com/ethan-luk/vial-tha/assets/100002960/7a36365c-6b15-46fb-b368-62701f35aaa8">


## Design Decisions

### Technologies
- React.js app for component based architecture and JSX syntax
- Typescript for static typing, easier detection of errors and improved code readability
- Vite for faster development servers and optimized build procedures
- Mantine used for styling

### Architecture and UI
- Components are divided into many subcomponents that each perform one specific function
- Most props declared closer to the root (variables and functions) then frequently passed between parent and child components to ensure synchronization of multiple components across the web page
- Commonly used props made into interfaces for modularity and scalability, ex: FilterOptions
  ```
  interface FilterOptions {
    gender: string, 
    showActiveOnly: boolean, 
    ageRange: [number, number], 
    startDate: Date, 
    endDate: Date
    searchText: string
  }
  ```
- All active filters and active sorting displayed as Mantine chips aligned horizontally for user experience, chips are clickable and doing so will deselect the filter or sort
- Components have different primary colours based on category (filtering = blue, sorting = green, status = cyan, table = grape, grid = pink)
- Built in Mantine styles used for almost all styling in app for component consistency
- Proper indentation for cleaner code readability and coding using multiple side tabs

#### For a surprise, try making sure no one in the dataset fits your filters 🤪


