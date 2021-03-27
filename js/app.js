const issueForm = document.getElementById("issueInputForm");

// UUIDs must be of the form "xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx", where x is one of [0-9, a-f] M is one of [1-5], and N is [8, 9, a, or b]
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function fetchIssues() {
  let issues = JSON.parse(localStorage.getItem("issues"));
  let issuesList = document.getElementById("issuesList");
  if (issues === null) return;
  issuesList.innerHTML = "";
  issuesList.innerHTML = issues
    .map((issue) => {
      return `
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card mb-3">
        <div class="card-body">
            <small class="card-subtitle mb-2 text-muted">Issue ID : ${issue.id}</small>
            <p><span class="badge badge-primary">${issue.status}</span><p>
            <h3>${issue.desc}</h3>
            <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            ${issue.priority}</p>
            <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
            </svg>
            ${issue.assignedTo}</p>
            <a href="#" class="btn btn-warning mb-1" role="button" onclick="setStatusClosed('${issue.id}')" >Close</a>
            <a href="#" class="btn btn-danger mb-1" role="button" onclick="deleteIssue('${issue.id}')" >Delete</a>
            </div>
            </div>
        </div>
    `;
    })
    .join("");
}

function saveIssues(event) {
  event.preventDefault();
  let now = new Date();
  const issueDesc = document.getElementById("issueDescInput").value;
  const issuePriority = document.getElementById("issuePriorityInput").value;
  const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  const issueId = uuidv4();
  const issueStatus = "Open";

  const issue = {
    id: issueId,
    desc: issueDesc,
    priority: issuePriority,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };
  const issuesList = [];
  if (localStorage.getItem("issues") === null) {
    issuesList.push(issue);
    localStorage.setItem("issues", JSON.stringify(issuesList));
  } else {
    const issuesList = JSON.parse(localStorage.getItem("issues"));
    issuesList.push(issue);
    localStorage.setItem("issues", JSON.stringify(issuesList));
  }

  issueForm.reset();
  fetchIssues();
}
function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  issues.forEach((issue) => {
    if (issue.id === id) {
      issue.status = "Closed";
    }
  });
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  issues.forEach((issue, index) => {
    if (issue.id === id) {
      issues.splice(index, 1);
    }
  });
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
document.addEventListener("DOMContentLoaded", fetchIssues);
issueForm.addEventListener("submit", saveIssues);
