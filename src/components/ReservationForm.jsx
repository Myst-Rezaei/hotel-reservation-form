import React, { useRef, useState } from "react";
import '../App.css';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Hami from "../images/Hami-logo.jpg";
{/*import telegram from "../images/telegram.svg";
import instagram from "../images/instagram.svg";
import eitaa from "../images/Eitaa-Logo.svg";
import call from "../images/call.svg";*/}

export default function ReservationForm() {
    const formRef = useRef();

    const [guestName1, setGuestName1] = useState("");
    const [guestName2, setGuestName2] = useState("");
    const [hotelName1, setHotelName1] = useState("");
    const [hotelName2, setHotelName2] = useState("");
    const [arrivalday, setArrivalday] = useState("");
    const [leavingday, setLeavingday] = useState("");
    const [stayingdays, setStayingdays] = useState("");
    const [typeofstayingday, setType] = useState("");
    const [noofadult, setNoofadult] = useState("");
    const [noofchildren, setNoofchildren] = useState("");
    const [firstmeal, setFirstmeal] = useState("");
    const [lastmeal, setLastmeal] = useState("");
    const [typeofroom, setTypeofroom] = useState("");
    const [reservationBill, setReservationBill] = useState("");
    const [guestPayment, setGuestPayment] = useState("");
    const [remaining, setRemaining] = useState("");
    const [reservationCode, setReservationCode] = useState("");
    const [reservationAgent, setReservationAgent] = useState("");
    const [price, setPrice] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [reservationDate, setReservationDate] = useState(null);
    const [arrivalDate, setArrivalDate] = useState(null);
    const [leavingDate, setLeavingDate] = useState(null);
    const [exporting, setExporting] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleExport = async (type = "image") => {
        setExporting(true);
        await delay(100);

        const element = formRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: type === "pdf" ? "#ffffff" : null,
            scrollX: 0,
            scrollY: -window.scrollY,
        });

        const image = canvas.toDataURL("image/png");

        if (type === "image") {
            const link = document.createElement("a");
            link.href = image;
            link.download = "reservation-form.png";
            link.click();
        } else {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(image);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("reservation-form.pdf");
        }

        setExporting(false);
    };

    const inputStyle = "border-b border-dotted border-gray-400 focus:outline-none w-full px-1 text-center";

    const maybeInput = (value, setValue) =>
        exporting ? (
            <div className={inputStyle}>{value || "ـــــــ"}</div>
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={inputStyle}
                placeholder="ـــــــ"
            />
        );


    const maybeInputNo = (value, setValue) =>
        exporting ? (
            <div className={inputStyle}>{value || "ـــــــ"}</div>
        ) : (
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={inputStyle}
                placeholder="ـــــــ"
            />
        );



    const maybeDate = (date, setDate) =>
        exporting ? (
            <div className="mt-1 inline-block p-2">{date?.format?.("YYYY/MM/DD") || "ـــــــ"}</div>
        ) : (
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={date}
                onChange={setDate}
                className="mt-1 inline-block p-2"
            />
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl">
                <div className="flex justify-center gap-4 mb-4 exportbtns" >

                    <button

                        onClick={() => handleExport("image")}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                    >
                        ذخیره به صورت تصویر
                    </button>
                    <button
                        onClick={() => handleExport("pdf")}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                    >
                        ذخیره به صورت PDF
                    </button>
                </div>

                <div
                    ref={formRef}
                    className="bg-white p-8 rounded-lg shadow-md mx-auto text-black">
                    <div className="grid grid-cols-3 gap-4 text-center con1">

                        <div className="grid grid-rows-[40px_40px_40px_40px] gap-1 justify-items-center">
                            <span className="text-center text-lg font-bold g-title"><label>مهمان</label></span>
                            {maybeInput(guestName1, setGuestName1)}
                            {maybeInput(guestName2, setGuestName2)}
                            <div className="flex items-center gap-2">
                                <span>متولد:</span>

                                <span className="custom-datepicker-m justify-items-center">
                                    {maybeDate(birthDate, setBirthDate)}
                                </span>

                            </div>
                        </div>

                        <div className="justify-items-center mb-6">
                            <div className="hami-logo">
                                <img src={Hami} alt="logo" />
                            </div>
                            <div className="text-xl font-bold mt-4">«تاییدیه رزرو»</div>
                        </div>

                        <div className="grid grid-rows-[40px_40px_40px_40px] gap-1 justify-items-center">
                            <label className="text-center text-lg font-bold h-title">هتل</label>
                            {maybeInput(hotelName1, setHotelName1)}
                            {maybeInput(hotelName2, setHotelName2)}
                            <div className="flex items-center gap-2">
                                <span>تاریخ:</span>
                                <span className="custom-datepicker-h justify-items-center">
                                    {maybeDate(reservationDate, setReservationDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 py-4 text-right ">
                        <div className="grid grid-cols-[230px_230px_230px] gap-2 text-sm text-right items-center con2">
                            {/* Row 1 */}
                            <div className="grid grid-rows-2 gap-1 justify-items-center border-gray-300">
                                <div className="flex items-center gap-2 ">
                                    <label className="whitespace-nowrap">ورود:</label>
                                    <span className="con2-datepicker-1">
                                  {maybeDate(arrivalDate, setArrivalDate)}
                                </span>
                                </div>
                                <div className="flex items-center gap-2 mr-1.5">
                                    <label className="whitespace-nowrap">روز:</label>
                                    {maybeInput(arrivalday, setArrivalday)}
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-1 justify-items-center border-l border-r border-gray-300">
                                <div className="flex items-center gap-2">
                                    <label className="whitespace-nowrap">خروج:</label>
                                    <span className="con2-datepicker-2">
                                      {maybeDate(leavingDate, setLeavingDate)}

                                </span>
                                </div>
                                <div className="flex items-center gap-2 mr-3.5">
                                    <label className="whitespace-nowrap">روز:</label>
                                    {maybeInput(leavingday, setLeavingday)}
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-2 justify-items-center  border-gray-300">
                                <div className="flex items-center gap-2 p-2">
                                    <label className="whitespace-nowrap">مدت اقامت:</label>
                                    {maybeInput(stayingdays, setStayingdays)}
                                </div>
                                <div className="flex items-center gap-2  mr-2">
                                    <label className="whitespace-nowrap">نوع اقامت: </label>
                                    {maybeInput(typeofstayingday, setType)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right mb-1">
                        <div className="grid grid-cols-3 gap-2 text-sm text-right items-center con2">
                            {/* Row 2 */}
                            <div className="grid grid-rows-2 gap-1 justify-items-center border-gray-300 conno">
                                <div className="flex items-center gap-2 justify-center min-w-[190px] ">
                                    <div className="flex items-center gap-2 ">
                                        <label className="whitespace-nowrap">تعداد بزرگسال:</label>
                                        {maybeInputNo(noofadult, setNoofadult)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 justify-center mr-3 min-w-[190px] pt-0.5">
                                    <div className="flex items-center gap-2 ">
                                        <label className="whitespace-nowrap">نفرات کودک:</label>
                                        {maybeInputNo(noofchildren, setNoofchildren)}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-2 justify-items-center border-l border-r border-gray-300">
                                <div className="flex items-center gap-2 ">
                                    <label className="whitespace-nowrap">وعده غذایی اول:</label>
                                    {maybeInput(firstmeal, setFirstmeal)}
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <label className="whitespace-nowrap">وعده غذایی آخر:</label>
                                    {maybeInput(lastmeal, setLastmeal)}
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-2 justify-items-center border-gray-300">
                                <div className="flex items-center gap-2 justify-items-center">
                                    <label className="whitespace-nowrap">نوع اتاق:</label>
                                    {maybeInput(typeofroom, setTypeofroom)}
                                </div>
                                <div className="flex items-center gap-2 justify-items-center mr-6">
                                    <label className="whitespace-nowrap">نرخ: </label>
                                    {maybeInput(price, setPrice)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right mb-1">
                        <div className="grid grid-cols-4 gap-2 text-sm text-right justify-items-center con5">
                            {/* Row 3 */}
                            <div className="items-center justify-center">
                                <div className="flex items-center gap-2 justify-center min-w-[190px] ">
                                    <div className="grid grid-rows-2 items-center gap-2 justify-items-center">
                                        <label className="whitespace-nowrap">جمع کل:</label>
                                        {maybeInput(reservationBill, setReservationBill)}
                                    </div>
                                </div>
                            </div>
                            <div className=" items-center justify-center">
                                <div className="grid grid-rows-2 items-center gap-2 justify-items-center">
                                    <label className="whitespace-nowrap">پرداختی مهمان:</label>
                                    {maybeInput(guestPayment, setGuestPayment)}
                                </div>
                            </div>
                            <div className=" items-center justify-center">
                                <div className="grid grid-rows-2 items-center gap-2 justify-items-center">
                                    <label className="whitespace-nowrap">باقی مانده:</label>
                                    {maybeInput(remaining, setRemaining)}
                                </div>
                            </div>
                            <div className="items-center justify-center">
                                <div className="grid grid-rows-2 items-center gap-2 justify-items-center">
                                    <label className="whitespace-nowrap">کد پیگیری:</label>
                                    {maybeInput(reservationCode, setReservationCode)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right">

                            {/* Row 4 */}
                            <div className="">
                                <div className=" grid grid-rows-[28px_60px] gap-2 con4">
                                    <label>توضیحات:</label>
                                    <textarea className="input pt-2 min-h-[60px]" rows="3" />
                                </div>
                            </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right mb-1">

                        {/* Row 5 */}
                        <div className="text-xs text-gray-600 leading-relaxed text-right">
                            <p>
                                ملاحظات و قوانین:
                            </p>
                            <p>
                                1. طبق قوانین هتل اقامت افراد زیر 18 سال به تنهایی در محل ممنوع
                                است.
                            </p>
                            <p>
                                2.  شماره اتاق و طبقه هنگام ورود به هتل و بر اساس موجودی توسط هتل تعیین میشود.
                            </p>
                            <p>3. تحویل اتاق ساعت 14 و تخلیه اتاق حداکثر تا 12 ظهر می‌باشد.</p>
                            <p>
                                4. همراه داشتن مدارک هویتی شناسنامه مدارک محرمیت ، گذرنامه برای مسافران خارجی الزامی میباشد.
                            </p>
                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right mb-1">

                        {/* Row 5 */}
                        <div className="text-xs text-gray-600 leading-relaxed text-right">
                            <p>
                                شرایط کنسلی:
                            </p>
                            <p>
                                تا 48 ساعت قبل از ورود نصف یک شب اقامت و تا 24 ساعت قبل از ورود هزینه یک شب اقامت کسر  میگردد ( در ایام پیک کنسلی امکان پذیر نمیباشد). در صورت کنسل کردن رزرو مبلغ قابل استرداد ظرف 72 ساعت  کاری به حساب مسافر عودت داده خواهد شد.
                            </p>

                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right mb-1">

                        {/* Row 5 */}
                        <div className="">

                          <div className=" grid grid-cols-2 gap-2 text-right justify-items-center">

                               <div className="text-sm leading-relaxed text-right">
                                  <p>
                                    رزرو قطعی فقط در صورت پرداخت بیعانه ثبت و انجام میگردد.
                                  </p>
                                  <p>
                                    شماره کارت : 6037-7310-7331-6380
                                  </p>
                                  <p>
                                      بانک مهر ایران ، بنام حسام مقبل
                                  </p>
                               </div>
                              <div className="items-center justify-self-end border-2 border-b-blue-950 rounded-xl w-32 agentbtn">
                                  <div className=" grid grid-rows-2 gap-1 justify-items-center text-center">
                                      <label className="whitespace-nowrap text-center">مسئول رزرو:</label>
                                      {maybeInput(reservationAgent, setReservationAgent)}
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className=" border-t border-gray-300 py-4 text-right ">

                        {/* Row 5 */}
                        <div className=" grid grid-cols-3 gap-1 justify-items-center mb-1 text-sm font-bold">
                            <div className="flex items-center gap-2 justify-center justify-items-center">
                                {/* <img  className="h-5 w-5 " src={eitaa} />
                                <img  className="h-5 w-5" src={telegram} />*/}

                                <p> تلگرام/ایتا :</p>
                                <p>Hami_hotel@</p>
                            </div>
                            <div className="flex items-center gap-2 justify-center justify-items-center ">
                                {/*  <img  className="h-5 w-5" src={instagram} />*/}
                                <p> اینستاگرام :</p>
                                <p>Hami.hotel@</p>
                            </div>
                            <div className="flex items-center  justify-center gap-2 justify-items-center">
                                {/*<img  className="h-5 w-5" src={call} />*/}
                                <p> شماره تماس :</p>
                                <p>05191690169</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
