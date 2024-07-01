const LaunchChatButton = (props) => {
  const { theme, open, setOpen } = props;

  const style = theme?.status?.minimized;
  const alignTo = theme?.status?.alignTo;

  const alignStyle =
    alignTo === "right"
      ? {
          // bottom: `${bottomsSpacing}px`,
          // right: `${sideSpacing}px`,
          backgroundColor: '#fff',
        }
      : {
          // bottom: `${bottomsSpacing}px`,
          // left: `${sideSpacing}px`,
          backgroundColor: '#fff',
        };

  return (
    <div
      id='chatbot-widget-floating'
      className={style === "bubble" ? `rcw-launcher ` : "rcw-bar-launcher"}
      style={{
        ...alignStyle,
        display: open?'none':'block',
        transition: 'all 1s'
      }}
      onClick={(e) => {
        e.preventDefault();
        setOpen(!open);
      }}
    >
      <div className="d-flex align-items-center w-100" >
          <div className="d-flex flex-column align-items-center w-100" style={{marginTop: '12px'}}>
              <img
                className="rcw-open-launcher"
                src="https://poolwater-pro.com/wp-content/uploads/2023/04/chatbot.jpg"
                width={36}
                height={36}
                alt="open"
              />
          </div>
      </div>
    </div>
  );
};

export default LaunchChatButton;
