// here some backup code availablehh
{
  /* <NavLink
                  to="/"
                  style={({ isActive }) => {
                    return {
                      paddingLeft: "5%",
                      textDecoration: "none",
                      color: theme.palette.color.navLink,
                    };
                  }}
                >
                  Home
                </NavLink>
          
                <NavLink
                  to="/about"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  About
                </NavLink>
                <NavLink
                  to="/categorys"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Category
                </NavLink>
                <NavLink
                  to="/providers"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Provider
                </NavLink>
                <NavLink
                  to="/contact"
                  style={{
                    paddingLeft: "5%",
                    textDecoration: "none",
                    color: theme.palette.color.navLink,
                  }}
                >
                  Contact
                </NavLink> */
}

//Removed redux files
//Counter
//REDUX File

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
