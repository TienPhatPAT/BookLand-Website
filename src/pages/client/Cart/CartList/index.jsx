import { resetCart } from "../../../../services/Cart";
import CartListItem from "../CartListItem";
import classes from "./CartList.module.scss";

const CartList = ({ cartList, setTotalPrice, totalPrice }) => {
  // resetCart();
  // console.log(cartList);
  return (
    <div className={classes.cartList}>
      {cartList.map((item, index) => {
        return (
          <CartListItem
            key={index}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
            {...item}
          />
        );
      })}
    </div>
  );
};

export default CartList;
