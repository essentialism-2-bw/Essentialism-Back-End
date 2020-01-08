
exports.seed = function(knex) {
  return knex('projects')
    .truncate()
    .then(function () {
      return knex('projects').insert([
        { user_id: 1, 
          user_values_id: 1,
          project_title: 'Work out',
          project_description: 'Lift weights every morning for 30 minutes.'
        },
        { user_id: 1, 
          user_values_id: 1,
          project_title: 'Run',
          project_description: 'Run 3 miles every morning!'
        },
        { user_id: 1, 
          user_values_id: 2,
          project_title: 'Read the news',
          project_description: 'Browse news websites with breakfast to stay up to date on the happenings'
        },
        { user_id: 2, 
          user_values_id: 3,
          project_title: 'Meditate',
          project_description: 'Meditate during your commute to enhance concentration.'
        },
        { user_id: 3, 
          user_values_id: 5,
          project_title: 'Try a new hobby / skill',
          project_description: 'Dedicate each month to trying out a new hobby or skill.'
        },
        { user_id: 3, 
          user_values_id: 6,
          project_title: 'Crunch time',
          project_description: 'Every morning, dedicate the first 3 hours of your workday to grinding out work without any distraction.'
        },
      ]);
    });
};
