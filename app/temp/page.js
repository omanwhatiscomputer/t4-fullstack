"use server";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";

const Range = () => {
    return (
        <div className="w-full h-[600px] flex pt-4">
            <div className=" flex justify-start items-center basis-[200px] flex-col ">
                <Image
                    className="w-[120px]"
                    src={"https://picsum.photos/80/120"}
                    width={200}
                    height={400}
                    alt={"random"}
                />
                <p className="block top-8 max-w-28 text-center text-sm [text-shadow:_1px_2px_1px_rgb(255_255_255_/_50%)] -translate-y-[164px]">
                    Author Name
                </p>
                <p className="block top-40 max-w-28 text-center [text-shadow:_1px_2px_1px_rgb(255_255_255_/_50%)] -translate-y-[68px]">
                    Book Title Title
                </p>
                <div className="bg-blue-600 text-white rounded-full text-sm py-1 px-3 block top-52 shadow-md -translate-y-[34px]">
                    5 <AiFillLike className="inline" />
                </div>
            </div>
            <div className="overflow-y-auto basis-auto ">
                <div>
                    <span className="text-gray-600 text-3xl font-semibold [text-shadow:_0_1px_1px_rgb(0_0_0_/_50%)] leading-4">
                        Book Title{" "}
                    </span>
                    <span className="text-slate-400 text-lg [text-shadow:_0_1px_1px_rgb(0_0_0_/_35%)]">
                        Paperback
                    </span>
                </div>
                <div className="text-lg font-semibold">
                    <span>by</span>{" "}
                    <span>
                        <i>Author Name</i>
                    </span>
                </div>
                <div className="text-lg text-slate-400 font-semibold">
                    <span>Publisher,</span> <span>Year</span>
                </div>
                <div>
                    <span className="text-lg leading-10 font-semibold">
                        Review
                    </span>
                </div>

                <div className="text-sm">
                    <div>
                        <span>Review 1</span>
                    </div>
                    <div>
                        <span className="text-slate-400">
                            &mdash; Name, Company
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Range;
