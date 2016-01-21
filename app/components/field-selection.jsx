dragItem: fieldId,origPosition
types: OutputField /* to specify which dragSource and dropTargets are compatible */

monitor updates the dnd state changes
collect: function that is used to tell the dnd what to do with the various 'dnd events/states' from the monitor.
connector let u assign roles (drag source, drag preview, drop target) to the DOM nodes.

Eg:

/* properties injected by dnd library */
function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver,
    connectDropTarget: connect.dropTarget()
  }
}

render: function() {
  var highlighted = this.props.highlighted;
  var hovered = this.props.hovered;
  var connectDropTarget = this.props.connectDropTarget;

  return connectDropTarget(
    <div className={classSet({
    'cell': true,
    'cell-highlighted': highlighted,
    'cell--hovered': hovered
    })}>
    {this.props.children}
    </div>
  )
}

/**** DRAGSOURCE *******/
var DragSource = require('react-dnd').DragSource;



var comp = React.createClass({
  render: function() {
    var id = this.props.id;

/* injected by react-dnd */
    var isDragging = this.props.isDragging
    var connectDragSource = this.props.connectDragSource;


  }
    modules.exports = DragSource(Types.OUTPUT_FIELD, dragSource, collect)(comp)
});
module.exports = DragSource()(comp);


var Types = {
  OUTPUT_FIELD: 'output-field'
};

var dragSource = {
  beginDrag: function(props) {
    //return the data that describes the dragged item
    var item = {fieldId: fieldId};
    return item;
  },
  endDrag: function (props, monitor, component) {
    //ignore if didn't find dropTarget
    if (!monitor.didDrop()) {
      return;
    }

    var field = monitor.getItem();
    var dropResult = monitor.getDropResult();
    FeatureActions.moveFieldToList(field.fieldId, dropResult.id);
  }
};

function collect(connect, monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
