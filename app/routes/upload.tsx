import React, { useState } from "react";

import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {useNavigate} from "react-router-dom";
import {usePuterStore} from "~/lib/puter";

const Upload = () => {
    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null > (null);

    const handleFileSelect = (file: File | null) => {
      setFile(file)
    }

    const handleAnalyze = async ({
                                     companyName,
                                     jobTitle,
                                     jobDescription,
                                     file,
                                 }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        setIsProcessing(true);
        setStatusText('Uploading the file ...');

        const uploadedFile = await fs.upload([file]);

       if(!uploadedFile) return setStatusText('Error Failed to upload file');
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description');

        if(!file) return;

        handleAnalyze({companyName, jobTitle, jobDecription, file});

    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />

            <section className="main-section flex flex-col items-center py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Smart feedback for your dream job
                </h1>

                {!isProcessing && (
                    <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                        </div>

                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                           <FileUploader onFileSelect={handleFileSelect}/>
                        </div>

                        <button className="primary-button" type="submit">
                                Analyze Resume
                        </button>
                        </form>

                )}
            </section>
        </main>
    );
};

export default Upload;
