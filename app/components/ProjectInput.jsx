import AltContainer from 'alt-container';
import React from 'react';
import ReactSelectize from 'react-selectize';

export default class ProjectInput extends React.Component{

    
    render() {
              var groups = [
                {
                  groupId: 'LY', 
                  title: 'LYCHEE'
                },
                { groupId: 'BW',
                  title: 'BLACK & WHITE'
                },
                { groupId: 'HG',
                  title: 'HUGGIES'
                }];

      var projects = [
          ['LY', 'P-1238'],
          ['LY', 'P-12311'],
          ['BW', 'B-1000'],
          ['HG', 'P-46'],
          ['HG', 'P-90']
       ];

      return (
          <ReactSelectize.MultiSelect 
          groups={groups}
          groupsAsColumns={true}
          options={projects.map(function(p){
              return {groupId: p[0],
                label: p[1],
                value: p[1]
                };
           })} 
          placeholder="Select Fruits (default: all)"
          filterOptions={function(options, values, search) {
            return options.filter(function(option){
                                    return option.label.indexOf(search) > -1;
                                  })
                          .map(function(option){
                            option.selectable = values.map(function(item){
                                                    return item.value;
                            }).indexOf(option.value) == -1
                            return option;
                          }).value()
          }}
        />
      );
    }
 // _deleteItem(value) {
    //this.setState({selectedValues: this.state.selectedValues.filter(function(item)=>
     //     return item.value !== value)});
  //}

  } 
