$(document).ready(function() {

  getTasks();

  $('#task-submit').on('click', function() {
    event.preventDefault();
    var taskInfo = {};
    taskInfo.newTask = $('#newTask').val();
    $('#newTask').val('');
    submitTask(taskInfo);
    console.log('submit task: ', taskInfo.newTask);
  });

  $('tbody').on('click', '.task-delete', function() {
    event.preventDefault();
    var deleteId = $(this).parent().parent().attr('id');
    console.log('to delete:', deleteId);
    deleteTask(deleteId);
  });

  $('tbody').on('click', 'input[type=checkbox]', function() {
    event.preventDefault();
    var taskId =  $(this).parent().parent().attr('id');
    console.log('taskid for flip: ', taskId);
    completeTask(taskId);
  });
});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(tasks) {
      appendTasks(tasks);
    },
    error: function() {
      console.log('Database error');
    }
  });
}

function completeTask(taskId) {
  $.ajax({
    type: 'PUT',
    url: '/tasks/completed/' + taskId,
    success: function(task) {
      getTasks();
    },
    error: function() {
      console.log('Database error');
    }
  });
}

function deleteTask(taskId) {
  //run ajax req if user confirms
  if (confirm("Are you sure you want to delete this task?") == true) {
    $.ajax({
      type: 'DELETE',
      url: '/tasks/delete/' + taskId,
      success: function(task) {
        getTasks();
      },
      error: function() {
        console.log('Database error');
      }
    });
  }
}

function appendTasks(tasks) {
  $("tbody").empty();
  //reverse sort by task id
  tasks.sort(function(a, b) {
    return b.id - a.id;
  });
  //send completed tasks to bottom of list
  var numChecked = 0;
  for (var i = 0; i < tasks.length- numChecked; i++) {
    if (tasks[i].completed === true) {
      tasks[i].status = 'checked';
      var temp = tasks.splice(i, 1);
      tasks.push(temp[0]);
      i--;
      numChecked++;
    } else {
      tasks[i].status = '';
    }
  }

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    $('tbody').append(
      '<tr class="' + task.status +
      'status" id="' + task.id + '"><td>' + task.id + '</td>' +
      '<td>' + task.task + '</td>' +
      '<td><input type="checkbox" ' + task.status + '></td>' +
      '<td><button class="btn task-delete">REMOVE</button></td></tr>'
    );
  }
}

function submitTask(newTask) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask,
    success: function(response) {
      console.log('owner post success');
      getTasks();
    },
    error: function() {
      console.log('could not post a new owner');
    }
  });
}
