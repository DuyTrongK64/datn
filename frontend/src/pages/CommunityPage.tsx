import { CommunityFeed } from '../components/CommunityFeed';

export function CommunityPage() {
  return (
    <section className="community-page">
      <div className="page-hero soft-hero">
        <div>
          <span className="eyebrow">Cộng đồng nội bộ</span>
          <h2>Bảng tin công ty</h2>
          <p>Nơi nhân viên chia sẻ thông tin, trao đổi nhanh và bình luận với nhau trong phạm vi nội bộ.</p>
        </div>
      </div>
      <CommunityFeed />
    </section>
  );
}
