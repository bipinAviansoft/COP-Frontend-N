export default function ReviewList({ reviewData, dataLimit }) {
  return (
    <>
      <div className="py-[15px] md:py-[30px] px-[15px] md:px-[40px] w-full">
        <ul>
          {reviewData?.reviews
            ?.slice(
              0,
              dataLimit === "full" ? reviewData?.reviews?.length : dataLimit
            )
            .map((item, index) => {
              return (
                <li
                  key={`review-li-${index}`}
                  className={`pb-[20px] mb-[20px] last:pb-0 last:mb-0 border-b-[1px] border-[#8080808C] last:border-none  `}
                >
                  <div className="">
                    <div className="flex items-center justify-between mb-[15px]">
                      <div className="">
                        <div className="flex items-center mb-[10px]">
                          <img
                            src="/images/non_profile_image.webp"
                            alt="Default user profile
                                              picture"
                            loading="lazy"
                            className="w-[30px] h-[30px] mr-[10px] rounded-[100px]"
                          />
                          <span className="text-[16px] font-semibold">
                            {item?.name}
                          </span>
                        </div>

                        <div className="gap-[4px] !flex-row p-0 m-0 border-[none] flex items-center">
                          {[...Array(5)].map((_, i) => {
                            return (
                              <>
                                {item?.rating > i + 1 ? (
                                  <>
                                    <svg
                                      className="w-[15px] h-[15px] md:w-auto md:h-auto"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.825 19.9233L5.45 12.8983L0 8.17334L7.2 7.54834L10 0.92334L12.8 7.54834L20 8.17334L14.55 12.8983L16.175 19.9233L10 16.1983L3.825 19.9233Z"
                                        fill="#F58A07"
                                      ></path>
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-[15px] h-[15px] md:w-auto md:h-auto"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M3.825 19.9233L5.45 12.8983L0 8.17334L7.2 7.54834L10 0.92334L12.8 7.54834L20 8.17334L14.55 12.8983L16.175 19.9233L10 16.1983L3.825 19.9233Z"
                                        fill="#808080"
                                      ></path>
                                    </svg>
                                  </>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="">
                        <ul className="m-0 p-0 [list-style:none] flex items-center gap-[20px]">
                          <li className="flex items-center gap-[7px]">
                            <img
                              src="/images/calc.png"
                              alt="Default user profile picture"
                              loading="lazy"
                            />
                            {item?.date}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-[14px] font-normal text-[#000000] leading-[140%] m-0">
                        {item?.review}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
