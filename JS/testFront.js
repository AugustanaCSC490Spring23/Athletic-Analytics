fetch('/output')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('output-table-body');

    data.forEach(user => {
      const row = tableBody.insertRow();
      const idCell = row.insertCell();
      const nameCell = row.insertCell();
      const emailCell = row.insertCell();

      idCell.innerText = user.id;
      nameCell.innerText = user.name;
      emailCell.innerText = user.email;
    });
  });


<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody id="output-table-body"></tbody>
</table>

