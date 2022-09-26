const taskList = [];
const badList = [];
const hrPerWeek = 24 * 7;
// multiple form handling with form data
const handleOnSubmit = (event) => {
  const frmData = new FormData(event);

  const task = frmData.get("task");

  const hour = frmData.get("hour");
  const obj = {
    task,
    hour,
  };

  taskList.push(obj);
  console.log(taskList);

  display();
};

const display = () => {
  let str = "";
  taskList.map(({ task, hour }, i) => {
    str += `<tr>
        <th scope="row">1</th>
        <td>${task}</td>
        <td>${hour}r</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-regular fa-trash-can"></i> Delete
          </button>
          <button class="btn btn-success">
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`;
  });
  document.getElementById("task-list").innerHTML = str;
};
