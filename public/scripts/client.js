$(document).ready(function() {

  getTasks();
  $('#task-submit').on('click', function() {
    event.preventDefault();
    var taskInfo = {};
    taskInfo.newTask = $('#newTask').val();
    $('#newTask').empty();
    submitTask(taskInfo);
    console.log('submit task: ', taskInfo.newTask);
  });

  $('tbody').on('click', '.task-delete', function() {
    event.preventDefault();
    var deleteId = $(this).parent().parent().attr('id');
    console.log('to delete:', deleteId);
    deleteTask(deleteId);
  });

  $('tbody').on('click', '.checkBox', function() {
    event.preventDefault();
    var taskId = $(this).val();
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
  console.log('taskID for flip', taskId);
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
  console.log('taskID for delete', taskId);
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
function appendTasks(tasks) {
  $("tbody").empty();

  for (var i = 0; i < tasks.length; i++) {

    $el = $('tbody');
    var task = tasks[i];
    //$el.data('id', task.id);
    console.log('task to append: ', task);
    var status = 'Check In';
    if (task.completed === true) {
      status = 'checked'
    }
    $el.append(
      '<tr id="' + task.id +
      '"><td>' + task.id + '</td>' +
      '<td>' + task.task + '</td>' +
      '<td><input class="checkBox" value="' + task.id +
      '" type="checkbox" ' + status + '></td>' +
      '<td><button class="task-delete" ">REMOVE</button></td></tr>'
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
