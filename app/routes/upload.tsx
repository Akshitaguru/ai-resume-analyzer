import { useState} from "react";
import React from 'react'
import Navbar from "~/components/Navbar";

const Upload = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const [statusText, setStatusText] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {}

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar/>

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full"/>
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex-col gap-4">
<div className="form-div">
    <label htmlFor="company-name">Company Name</label>
    <input type="text" name="comapny-name" placeholder="Company Name" id="comapny-name" />
</div>
                        </form>
                        )}
                </div>
            </section>
        </main>
    )
}
export default Upload