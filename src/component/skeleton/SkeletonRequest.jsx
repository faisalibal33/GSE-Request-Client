import { Skeleton } from "@mui/material";

const SkeletonRequest = () => {
  return (
    <div className="cardRequest">
      <div className="cardImageClose">
        <Skeleton variant="rectangular" width={200} height={200} />
        <Skeleton width="100%" height="10%" />
      </div>
      <div>
        <Skeleton height={40} width={160} />
        <Skeleton height={27} width={130} />
        <Skeleton height={27} width={100} />
        <Skeleton height={27} width={140} />
        <Skeleton height={27} width={130} />
        <Skeleton height={27} width={160} />
      </div>
      <div className="crDetails">
        <Skeleton height={40} width={60} />
        <Skeleton height={40} width={60} />
      </div>
    </div>
  );
};

export default SkeletonRequest;
