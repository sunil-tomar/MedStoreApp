export const LogoutPage = ({ imgUrl, logOut }) => {
  return (
    <div>
      <span>
        <img
          src={imgUrl}
          alt="User Image not found!"
          style={{ height: "8rem", width: "8rem", float: "left" }}
        />
      </span>
      <span onClick={logOut} style={{ color: "red", float: "right" }}>
        logOut
      </span>
    </div> 
  );
};
