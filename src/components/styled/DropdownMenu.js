import './DropdownMenu.css';

const MenuItem = ({item}) => {
    const {onClick, title, Icon } = item;
    return (
        <div className="menu-item" onClick={onClick}>
            {Icon && <Icon className="icon" />}
            {title && <div className="menu-item__title">{title}</div>}
        </div>
    );
}

function DropdownMenu({items, style}) {

  return (
    <div className="dropdown-menu-container" style={style}>
        <div className="dropdown-menu-content">
            {items.map((item, index) => (<MenuItem item={item} key={index}/>))}
        </div>
    </div>
  );
}

export default DropdownMenu;