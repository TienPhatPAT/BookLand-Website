import { createArray } from "../../utils/array";
import { StarIcon } from "../Icon";
import classes from "./StarBar.module.scss";

const StarBar = ({ height = 14, starCount = 0 }) => {
  return (
    <div style={{ height: height }} className={classes.starBar}>
      {Number.isInteger(starCount) && (
        <>
          {createArray(starCount).map((item, index) => (
            <StarIcon key={index} color="var(--yellow-text-color)" />
          ))}
          {createArray(5 - starCount).map((item, index) => (
            <StarIcon key={index} color="var(--light-gray-text-color)" />
          ))}
        </>
      )}
      {!Number.isInteger(starCount) && (
        <>
          {createArray(Math.floor(starCount)).map((item, index) => (
            <StarIcon key={index} color="var(--yellow-text-color)" />
          ))}
          <div className={classes.defectStar}>
            <div className={classes.yellowPart}>
              <StarIcon color="var(--yellow-text-color)" />
            </div>
            <div
              className={classes.grayPart}
              style={{
                "--star-decimal": `${
                  (starCount - Math.floor(starCount)) * 100
                }%`,
              }}
            >
              <StarIcon color="var(--light-gray-text-color)" />
            </div>
          </div>
          {createArray(5 - Math.ceil(starCount)).map((item, index) => (
            <StarIcon key={index} color="var(--light-gray-text-color)" />
          ))}
        </>
      )}
    </div>
  );
};

export default StarBar;
