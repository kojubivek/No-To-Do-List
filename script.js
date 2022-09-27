let taskList = [];
const hrPerWeek = 24 * 7;

// multiple form handling with form data
const handleOnSubmit = (event) => {
  const frmData = new FormData(event);

  const task = frmData.get("task");

  const hour = +frmData.get("hour");
  const obj = {
    task,
    hour,
    type: "entry",
  };

  // console.log(totalTaskHours());
  // const getTotal = totalTaskHours();
  // if (getTotal > hrPerWeek) {
  //   return alert(`hours exceed for this week`);
  // }

  const total =
    taskList.reduce((acc, { hour }) => {
      return (acc += hour);
    }, 0) + hour;
  console.log(total);

  if (total > hrPerWeek) {
    return alert("soory no time to add");
  }
  taskList.push(obj);
  display();
};

const display = () => {
  let str = "";
  taskList.map(({ task, hour, type }, i) => {
    str +=
      type === "entry"
        ? `<tr>
        <th scope="row">${i + 1}</th>
        <td>${task}</td>
        <td>${hour}r</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-regular fa-trash-can" onclick="deleteItem(${i})"></i> Delete
          </button>
          <button onclick="updateTask(${i},'bad')" class="btn btn-success">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`
        : " ";
  });
  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();

  // displayBadList();
};
const displayBadList = () => {
  let str = "";
  taskList.map(({ task, hour, type }, i) => {
    str +=
      type === "bad"
        ? `<tr>
        <th scope="row">${i + 1}</th>
        <td>${task}</td>
        <td>${hour}r</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-regular fa-trash-can" onclick="deleteItem(${i})"></i> Delete
          </button>
          <button onclick="updateTask(${i},'entry')" class="btn btn-success">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`
        : "";
  });
  document.getElementById("bad-list").innerHTML = str;
  totalTaskHours();

  // displayBadList();
};

const updateTask = (i, type) => {
  taskList = taskList.map((element, index) => {
    if (i === index) {
      element.type = type;
    }
    return element;
  });
  display();
  displayBadList();
};
const totalTaskHours = () => {
  const total = (document.getElementById("totalHours").innerText =
    taskList.reduce((acc, { hour }) => {
      return acc + hour;
    }, 0));
};
const totalBadHours = () => {
  const total = (document.getElementById("BadHours").innerText =
    taskList.reduce((acc, { type, hour }) => {
      return type === "bad" ? acc + hour : acc + 0;
    }, 0));
};

const deleteItem = (i) => {
  if (window.confirm("are you sure you want to delete this")) {
    taskList.splice(i, 1);
    display();
    displayBadList();
  }
};
