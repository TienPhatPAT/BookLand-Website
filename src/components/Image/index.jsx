const Image = ({ url, children, ...props }) => {
  const imgStyle = {
    background: `url('${url}') no-repeat center / cover`,
  };
  return (
    <div style={imgStyle} {...props}>
      {children}
    </div>
  );
};

export default Image;
