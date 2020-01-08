
exports.seed = function(knex) {
  return knex('user_values')
    .truncate()
    .then(function () {
      return knex('user_values').insert([
        { user_id: 1, 
          value_name: 'Health', 
          color: 'blue', 
          importance_description: 'Keeping in excelllant health is necessary for good for mental and physical performance'
        },
        { user_id: 1, 
          value_name: 'Awareness', 
          color: 'green', 
          importance_description: 'Reading/watching the news keeps you aware of local/national/international events and how it affects your life.'
        },
        { user_id: 1, 
          value_name: 'Curiosity', 
          color: 'orange', 
          importance_description: 'Wanting to know is a great motivator for learning'
        },
        { user_id: 2, 
          value_name: 'Concentration', 
          color: 'red', 
          importance_description: 'Sleep & exercise help with keeping your mind strong so you can focus on the things you are doing'
        },
        { user_id: 2, 
          value_name: 'Ethical', 
          color: 'grey', 
          importance_description: 'Always do the right thing'
        },        
        { user_id: 2, 
          value_name: 'Hard work', 
          color: 'brown', 
          importance_description: 'Along with luck gets you what you want'
        },


/*
        { "user_id": 3, 
          "value_name": "valueA_ForUsr3", 
          "color": "yellowA", 
          "importance_description": "A is first letter"
        },
        { "user_id": 3, 
          "value_name": "valueB_ForUsr3", 
          "color": "yellowB", 
          "importance_description": "B is second letter"
        },        
        { "user_id": 3, 
          "value_name": "valueC_ForUsr3", 
          "color": "yellowC", 
          "importance_description": "C is third letter"
        }
*/


      ]);
    });
};
