let taskList = [];
let badList = [];
const hrPerWeek = 24 * 7;

// multiple form handling with form data
const handleOnSubmit = (event) => {
  const frmData = new FormData(event);

  const task = frmData.get("task");

  const hour = +frmData.get("hour");
  const obj = {
    task,
    hour,
  };

  // console.log(totalTaskHours());
  // const getTotal = totalTaskHours();
  // if (getTotal > hrPerWeek) {
  //   return alert(`hours exceed for this week`);
  // }
  const totalTaskHours = taskList.reduce((acc, { hour }) => {
    return (acc += hour);
  }, 0);

  const total = totalTaskHours + hour + totalbadHours();
  console.log(total);

  if (total > hrPerWeek) {
    return alert("soory no time to add");
  }
  taskList.push(obj);
  display();
  totalTaskHoursfunc();
};

const display = () => {
  let str = "";
  taskList.map(({ task, hour }, i) => {
    str += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${task}</td>
        <td>${hour}r</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-regular fa-trash-can" onclick="deleteItem(${i})"></i> Delete
          </button>
          <button onclick="markAsNotToDo(${i})" class="btn btn-success">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`;
  });
  document.getElementById("task-list").innerHTML = str;
  totalhoursavailable();
  // displayBadList();
};

const totalhoursavailable = () => {
  const total = totalTaskHoursfunc() + totalbadHours();
  document.getElementById("totalHours").innerText = total;
};
const totalTaskHoursfunc = () => {
  const total = taskList.reduce((acc, { hour }) => {
    return (acc = acc + hour);
  }, 0);
  return total;
  // document.getElementById("totalHours").innerText = totalhoursavailable();
};

const totalbadHours = () => {
  const total = badList.reduce((acc, { hour }) => {
    return (acc = acc + hour);
  }, 0);

  document.getElementById("totalBadHours").innerText = total;
  return total;
};

const deleteItem = (i) => {
  console.log(i);
  if (!window.confirm("Are you sure you want to delete this task?")) return;
  const tempArg = taskList.filter((item, index) => {
    return i !== index;
  });
  taskList = tempArg;

  display();
};
const deleteBadItem = (i) => {
  console.log(i);
  if (!window.confirm("Are you sure you want to delete this task?")) return;
  const tempArg = badList.filter((item, index) => {
    return i !== index;
  });
  badList = tempArg;

  displayBadList();
};

const displayBadList = () => {
  let str = "";
  badList.map(({ task, hour }, i) => {
    str += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${task}</td>
        <td>${hour}hr</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-regular fa-trash-can" onclick="deleteBadItem(${i})"></i> Delete
          </button>
          <button class="btn btn-success">
            <i class="fa-sharp fa-solid fa-arrow-left" onclick="markAsTaskList(${i})"></i>
          </button>
        </td>
      </tr>`;
  });
  document.getElementById("bad-list").innerHTML = str;
  document.getElementById("totalHours").innerText = totalhoursavailable();
  totalbadHours();
  display();
};

const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1)[0];

  badList.push(item);
  displayBadList();
  display();
};

const markAsTaskList = (i) => {
  const item = badList.splice(i, 1)[0];

  taskList.push(item);
  displayBadList();
  display();
};
