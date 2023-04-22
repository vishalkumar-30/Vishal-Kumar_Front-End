# Steeleye-Frontend-Assignment
Submission of assignment given by Steeleye in [this](https://github.com/steeleye/recruitment-ext/wiki/Frontend-Engineer-Assignment) repository.
- Added react project in the repository containing **most optimized code of List component**.
- Called List from App.js
- Below are the **answers of queries** asked in the assignments along with the **screenshots of errors/warnings**
- Attached **screenshot of running code**

## Query 1
Explain what the simple List component does.

## Answer 1

### Explaing the logic behind the code

This is a React functional component called **List**, which takes an array of ```items``` as props and renders a list of ```SingleListItem``` components with the corresponding text. Each ```SingleListItem``` component is a single list item that can be selected by clicking on it. When an item is selected, its background color changes to green, while the background color of all other items in the list changes to red.

The ```SingleListItem``` component is memoized to prevent unnecessary re-renders, and it takes four props: **index, isSelected, onClickHandler, and text**.

The ```WrappedListComponent``` component is also memoized and takes one prop: ```items```. It uses the ```useState``` hook to manage the state of the currently selected item, and it resets the selected index to null whenever the items prop changes using the ```useEffect``` hook. The ```handleClick``` function sets the selected index to the index of the clicked item, and it is passed to each ```SingleListItem``` component as a prop along with the item's index, text, and a boolean indicating whether or not the item is currently selected.

### Describing how UI rendering happens with above logic

This component renders a list of items in the browser. Each item in the list is represented by a ```SingleListItem``` component.

When an item is clicked, its corresponding index is set as the ```selectedIndex``` in the List component state. This causes the item to be highlighted with a green background color.

The list is initially rendered with no selected item, and when the list of items changes (e.g., due to new data being fetched), the ```selectedIndex``` is reset to null to ensure that no item remains selected if it is no longer in the list.

The component uses the ```useState``` hook to manage the state of the selected item index, and the```useEffect``` hook to reset the ```selectedIndex``` when the list of items changes.

Finally, the component uses the ```memo``` HOC to optimize performance by memoizing the ```SingleListItem``` and ```WrappedListComponent``` components. This helps to prevent unnecessary re-renders when the list or item data does not change.

## Query 2

What problems / warnings are there with code?

## Answer 2


I create the react app, and tried running the given code snippet of List component but encountered various errors and warnings which are as follows:

- ```PropTypes.array``` should be ```PropTypes.arrayOf``` in the definition of the ```items``` propType in the ```WrappedListComponent```.

- The ```isSelected``` prop passed to the ```SingleListItem``` component is always set to ```selectedIndex```, which is a state object rather than a boolean value. This can cause issues with the ```style``` property of the ```li``` element, which expects a boolean. To fix this, the ```isSelected``` prop should be set to a boolean value based on whether the ```index``` prop of the ```SingleListItem``` component matches the ```selectedIndex``` state of the ```ListComponent```.

- The ```onClickHandler``` prop passed to the ```SingleListItem``` component is not defined correctly. It should be a function that calls the ```handleClick``` function with the ```index``` prop of the ```SingleListItem``` component as its argument.

Also, attaching the screenshots:

![](https://github.com/vishalkumar-30/Steeleye-Frontend-Assignment/blob/main/src/Screenshots/proptypeserror.png)


![](https://github.com/vishalkumar-30/Steeleye-Frontend-Assignment/blob/main/src/Screenshots/shapeofError.png)

## Problem 3
Please fix, optimize, and/or modify the component as much as you think is necessary.

## Answer 3

As discussed above the fix for each error/warning, I modified given code to below code:

```
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
```

After analysing the above fixed code I did following optimizations:

- ***Use object destructuring for the props passed to WrappedSingleListItem***:
Instead of passing index, isSelected, onClickHandler, and text as individual props, we can use object destructuring to make the code more concise and easier to read:
    
    ```
    const WrappedSingleListItem = ({
      index,
      isSelected,
      onClickHandler,
      text,
    }) => {
      return (
        <li
          style={{ backgroundColor: isSelected ? 'green' : 'red'}}
          onClick={() => onClickHandler(index)}
        >
          {text}
        </li>
      );
    };
    ```
    can be written as:
    
    ```
    const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
      return (
        <li
          style={{ backgroundColor: isSelected ? 'green' : 'red'}}
          onClick={() => onClickHandler(index)}
        >
          {text}
        </li>
      );
    };
    ```
- ***Use === instead of == for strict equality:***
When checking if selectedIndex is equal to index in WrappedListComponent, we can use === instead of == for strict equality checking.

    ```
    isSelected={selectedIndex == index}
    ```
    
    can be written as:
    ```
    isSelected={selectedIndex === index}
    ```
- ***Add a key prop to the SingleListItem component:***
When rendering an array of components in React, it's important to add a key prop to each component so that React can keep track of them and optimize updates.
    ```
    <SingleListItem
      onClickHandler={() => handleClick(index)}
      text={item.text}
      index={index}
      isSelected={selectedIndex === index}
    />
    ```
    can be written as:
    ```
    <SingleListItem
      key={index}
      onClickHandler={() => handleClick(index)}
      text={item.text}
      index={index}
      isSelected={selectedIndex === index}
    />
    ```
- ***Remove unnecessary memo wrapping:***
    Since SingleListItem is already memoized with memo, there is no need to wrap it again in WrappedListComponent.

Here is the optimized code:

```
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(List);

```
These optimizations are making the code more efficient and easier to read.

### After runnning the project

I wrote my **App.js** as following:

```import React from 'react';
import List from './List';

const items = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const App = () => {
  return (
    <div>
      <h1>List Example</h1>
      <List items={items} />
    </div>
  );
};

export default App;

```

With the most optimized version of **List** component, attaching the screenshots below:

A list of items passed as **prop** to component is rendered on the screen having red background. Whenever any item is clicked it becomes green, and if some different item is clicked then previous one will become red(original background) and current item will become green as mentioned in the logic.

![](https://github.com/vishalkumar-30/Steeleye-Frontend-Assignment/blob/main/src/Screenshots/vs.png)

![](https://github.com/vishalkumar-30/Steeleye-Frontend-Assignment/blob/main/src/Screenshots/red.png)

![](https://github.com/vishalkumar-30/Steeleye-Frontend-Assignment/blob/main/src/Screenshots/green.png)

# Author
Name - Vishal Kumar

Reg. No. - 9140057570

Mobile - 9140057570

Email - vk30official@gmail.com

