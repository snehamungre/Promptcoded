import "./style/appStyle.css";

const Privacy = () => {
    return (
        <div className="App">
            <h1>Privacy Policy</h1>
            <br></br>
            <div>
                <h2>The Types of Personal Data We Collect</h2>
                <br></br>
                Your profile information.
                When you register with this platform, we collect information including your full name, username, and password.
                <br></br>
                Your attempts and results to the codes sample questions.
                We process and collect information you generate by using this plateform including your responses to the code samples, the generated llm response, your test scores, timestamp of the attempt, and any additional comments you put on the attempt.
            </div>
            <div>
                <h2>How We Use Collected Information</h2>
                <br></br>
                Provide you and your instructor with your past scores and results.
                In addition, your attempts and results may be shared with educational and research institutions to study how to measure and improve of code comprehension among students.
                Your personal information including your name, username, and passwords will not be shared with external organizations.
            </div>
            <div>
                <h2>Security</h2>
                <br></br>
                How do we keep your information safe?
            </div>
            <div>
                <h2>Third-Party Organizations
                    <br></br></h2>
                No third-party services are used by this plateform.
                However, user question attempts and results may be shared with third-party research and educational institutions for research.
            </div>
        </div>
    );
};

export default Privacy;
