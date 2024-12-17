"use client";

import { useFormContext } from "react-hook-form";
import React, {useState} from "react";

interface Option {
  value: string;
  label: string;
}

const languages: Option[] = [
  { value: '日本語', label: '日本語' },
  { value: 'English', label: 'English' },
  { value: 'Italian', label: 'Italian' },
];

const moneys: Option[] = [
  { value: 'JPY', label: 'JPY' },
  { value: '元', label: '元' },
  { value: '＄', label: '＄' },
];

const publicdays: Option[] = [
  { value: '月末', label: '月末' },
  { value: '月初', label: '月初' },
];

const sites: Option[] = [
  { value: '翌月末', label: '月末締め翌月未払い' },
  { value: '翌月初', label: '月初支払い' },
];

const cycles: Option[] = [
  { value: '1', label: '1ヶ月' },
  { value: '2', label: '2ヶ月' },
  { value: '3', label: '3ヶ月' },
];

const sendway: Option[] = [
  { value: '10', label: '送付不要(10)' },
  { value: '20', label: '要送付(20)' },
];

const shares: Option[] = [
  { value: '0', label: '無し' },
  { value: '1', label: '有り' },
];

const taxs: Option[] = [
  { value: '0', label: '非課税' },
  { value: '1', label: '課税' },
];

const Register = () => {
  const {
    register,
    handleSubmit
  } = useFormContext();


  // setterを用意
  const [code,setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].value);
  const [selectedMoney, setSelectedMoney] = useState<string>(moneys[0].value);
  const [selectedDay, setSelectedDay] = useState<string>(publicdays[0].value);
  const [selectedSite, setSelectedSite] = useState<string>(sites[0].value);
  const [selectedCycle, setSelectedCycle] = useState<string>(cycles[0].value);
  const [selectedWay, setSelectedWay] = useState<string>(sendway[0].value);
  const [selectedShares, setSelectedShares] = useState<string>(shares[0].value);
  const [selectedTaxs, setSelectedTaxs] = useState<string>(taxs[0].value);

  const langChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };
  const moneyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMoney(event.target.value);
  };
  const dayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };
  const siteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSite(event.target.value);
  };
  const cycleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCycle(event.target.value);
  };
  const wayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWay(event.target.value);
  };
  const shareChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShares(event.target.value);
  };
  const taxChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTaxs(event.target.value);
  };
  const onSubmit = async () =>  {
    const res = await fetch(
      `http://localhost:8080/api/update`,
      {
        method: "POST",    
        body:"BillingCode:"+ code + "\n言語:"+selectedLanguage + "\n通貨:"+ selectedMoney
             +"\n発行日:"+ selectedDay + "\n支払いサイト:" + selectedSite + "\n請求サイクル:" + selectedCycle
             +"\n送付方法:" + selectedWay + "\nレベニューシア:" + selectedShares + "\n課税:" + selectedTaxs,
      },
    );
  };
  const fetchCode = async () => {
    try {
        const res = await fetch('http://localhost:8080/api');
        const data = await res.json();  // 2. APIのレスポンスの型を指定
        setCode(data.code);
        setSelectedLanguage(data.languages);
        setSelectedMoney(data.moneys);
        setSelectedDay(data.publicdays);
        setSelectedSite(data.sites);
        setSelectedCycle(data.cycles);
        setSelectedWay(data.sendway);
        setSelectedShares(data.shares);
        setSelectedTaxs(data.taxs);
    } catch (error) {
        console.error("Error fetching hello:", error);
    }
};

  return (
    <main className="">
      <div className="relative flex  items-center bg-[register-pattern] text-gray-700">
        <div className="w-full max-w-md px-4 py-8 rounded">    
          <h1 className="text-gray-700 font-bold mb-6 font-size-18" style={{fontSize:'29px'}}>請求基本情報</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex gap-20">
              <label
                htmlFor="code"
                className=" text-gray-700 text-sm font-bold mb-2 text-xl"
              >
                BillingCode
              </label>
              <input
                type="text"
                id="code"
                value={code}
                {...register("code", {
                  required: "お名前は必須項目です",
                })}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="(例)JP00000"
              />
            </div>
            <div className="mb-4 flex gap-40">
              <label
                  htmlFor="language"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                言語
              </label>
              <select value={selectedLanguage} onChange={langChange} className="align-items-center shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-40">
              <label
                  htmlFor="money"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                通貨
              </label>
              <select value={selectedMoney} onChange={moneyChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {moneys.map((money) => (
                  <option key={money.value} value={money.value}>
                    {money.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-36">
              <label
                  htmlFor="publicday"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                発行日
              </label>
              <select value={selectedDay} onChange={dayChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {publicdays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-20">
              <label
                  htmlFor="site"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                支払いサイト
              </label>
              <select value={selectedSite} onChange={siteChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {sites.map((site) => (
                  <option key={site.value} value={site.value}>
                    {site.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-20">
              <label
                  htmlFor="cycle"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                請求サイクル
              </label>
              <select value={selectedCycle} onChange={cycleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {cycles.map((cycle) => (
                  <option key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-28">
              <label
                  htmlFor="sendway"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                送付方法
              </label>
              <select value={selectedWay} onChange={wayChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {sendway.map((way) => (
                  <option key={way.value} value={way.value}>
                    {way.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-10">
              <label
                  htmlFor="share"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                レベニューシェア
              </label>
              <select value={selectedShares} onChange={shareChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {shares.map((share) => (
                  <option key={share.value} value={share.value}>
                    {share.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex gap-36">
              <label
                  htmlFor="tax"
                  className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2 "
                  style={{fontSize:'18px'}}
              >
                課税
              </label>
              <select value={selectedTaxs} onChange={taxChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {taxs.map((tax) => (
                  <option key={tax.value} value={tax.value}>
                    {tax.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-56"
                onClick={fetchCode}
              >
                APIからデータ取得
              </button>
            </div>
            <br/>
            <div className="flex items-center justify-center space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline w-56"
                type="submit"
                onClick={onSubmit}
              >
                更新
              </button>
            </div>      
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;