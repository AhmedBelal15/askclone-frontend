import './switch.style.css'

const Switch = ({isAnonymous, setIsAnonymous}) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        id="toggleSwitch"
        value={isAnonymous}
        onChange={()=>setIsAnonymous(!isAnonymous)}
      />
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default Switch;
