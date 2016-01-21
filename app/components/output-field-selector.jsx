define(function(require) {
  var React = require('react');
  var fields = require('../constants/fields.json');
  var BS = require('react-bootstrap');


  var FieldItem = React.createClass({
    displayName: 'FieldItem',
    propTypes: {
      field: React.PropTypes.object.isRequired,
      onClick: React.PropTypes.func.isRequired
    },
    render: function() {
        var fieldName = this.props.field.displayName;
        var fieldId = this.props.field.logicalName;
        return (
          <li className="list-group-item"
              onClick={this.props.onClick.bind(null,fieldId)}
          >
          {fieldName}
          </li>
        )
    }
  });


  var FieldList = React.createClass({
    displayName: 'FieldList',
    propTypes: {
      fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
      onItemSelected: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
      return {fields: this.props.fields}
    },
    render: function() {

      var {onItemSelected, fields, children, ...other} = this.props;
      return (

        <BS.ListGroup componentClass="ul" {...other} >
          {this.state.fields.map(function(f) {
            return (<FieldItem field={f} key={f.logicalName} onClick={onItemSelected} />);
          })}
        </BS.ListGroup>
      )
    }
  })


  return React.createClass({
    getInitialState: function() {
      return {
        fields: this.getFields()
      };
    },

    getFields: function getFields(){
      //convert field object to array and init with unselected.
      var baseFields = Object.keys(fields['BaseSelamat']).map(function (key){
          var f = fields['BaseSelamat'][key];
          f.selected = false;
          return f;

      });
      return baseFields;
    },


      render: function() {
        var selectedFields = this.state.fields.filter(function(f) { return f.selected });
        var availFields = this.state.fields.filter(function(f) {return !(f.selected)});
        console.log(selectedFields.length, availFields.length);
        return (<div className="container">
        <div>
          <FieldList className="col-md-4 fieldList"  fields={availFields} onItemSelected={this.updateSelectedState.bind(this)}/>
          <FieldList className="col-md-4 fieldList" fields={selectedFields} onItemSelected={this.updateSelectedState.bind(this)}/>
          </div>
          <pre>basefieldsArr = {JSON.stringify(this.getFields(),null, ' ')}</pre>
          <pre>basefields = {JSON.stringify(fields['BaseSelamat'],null, ' ')}</pre>
          <pre>fields = {JSON.stringify(fields,null, ' ')}</pre>
        </div>)
      },

      updateSelectedState: function(fieldId) {
        console.log(fieldId);
        var f = this.state.fields[fieldId];
        this.state.fields.every(function (field) {
          if(field.logicalName == fieldId) {
            field.selected = !field.selected;
            return false;
          }
        });
        this.setState({fields: fields});

        console.log(f);
        console.log(event);
        console.log(fieldId);
      }
  });
})
