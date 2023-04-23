import "../components/adminstyles.css";
import '../Experts/DashboardExpert.css'

function CancellationRefund() {
    return (
        <>
            <div className="contai" style={{ marginTop: "20px" }} >
                <div className="admin">
                    <h1 >{"Cancellation & Refund Policy"}</h1>

                    <div style={{ margin: "10px", justifyContent: "center" }}>
                        Last updated on Apr 11th 2023

                        No cancellations & Refunds are entertained
                    </div>
                    <div style={{ marginTop: "30px", marginBottom: "20px" }}> <a href="https://toggle10.in/"
                        target='_blank' className="toggle">Powered By @TOGGLE10
                    </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CancellationRefund;
