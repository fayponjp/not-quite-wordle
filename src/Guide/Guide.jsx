import './guide.css'
export default function Guide() {
    return (
        <div className='guide'>
            <h2>Quick Guide</h2>
            <div className='guide-icons'>
                <div className='guide-icon guide-correct'>Correct!</div>
                <div className='guide-icon guide-almost'>Right letter, wrong position!</div>
                <div className='guide-icon guide-incorrect'>Incorrect!</div>
            </div>
        </div>
    );
}
