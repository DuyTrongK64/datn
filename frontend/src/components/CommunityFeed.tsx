import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../api/http';
import type { CommunityPost } from '../types';

function shortDateTime(value?: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(0, 16);
}

export function CommunityFeed({ compact = false }: { compact?: boolean }) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [commentByPost, setCommentByPost] = useState<Record<string, string>>({});
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: async () => (await http.get<CommunityPost[]>('/community/posts')).data
  });

  const createPostMutation = useMutation({
    mutationFn: async () => (await http.post<CommunityPost>('/community/posts', { content })).data,
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });

  const commentMutation = useMutation({
    mutationFn: async ({ postId, text }: { postId: string; text: string }) => (
      await http.post(`/community/posts/${postId}/comments`, { content: text })
    ).data,
    onSuccess: (_data, variables) => {
      setCommentByPost((prev) => ({ ...prev, [variables.postId]: '' }));
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    }
  });

  function submitPost(e: FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    createPostMutation.mutate();
  }

  function submitComment(e: FormEvent, postId: string) {
    e.preventDefault();
    const text = commentByPost[postId] || '';
    if (!text.trim()) return;
    commentMutation.mutate({ postId, text });
  }

  const displayPosts = compact ? posts.slice(0, 3) : posts;

  return (
    <div className="community-feed">
      {!compact && <form className="card post-composer" onSubmit={submitPost}>
        <div className="section-title-row">
          <div>
            <h3>Chia sẻ với đồng nghiệp</h3>
            <p>Đăng thông báo ngắn, trao đổi kinh nghiệm làm việc hoặc nhắc nhở liên quan đến chấm công.</p>
          </div>
        </div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Bạn muốn chia sẻ điều gì với mọi người?" rows={4} />
        <div className="form-actions right-actions">
          <button type="submit" disabled={createPostMutation.isPending}>{createPostMutation.isPending ? 'Đang đăng...' : 'Đăng bài'}</button>
        </div>
      </form>}

      <div className="post-list">
        {isLoading && <div className="card">Đang tải bài đăng...</div>}
        {!isLoading && displayPosts.length === 0 && <div className="card empty-state">Chưa có bài đăng nào.</div>}
        {displayPosts.map((post) => (
          <article className="card post-card" key={post.id}>
            <div className="post-header">
              <div className="avatar-circle">{(post.employeeName || post.employeeCode || '?').slice(0, 1).toUpperCase()}</div>
              <div>
                <strong>{post.employeeCode ? `${post.employeeCode} - ${post.employeeName}` : post.employeeName}</strong>
                <span>{post.departmentName || 'Nội bộ'} · {shortDateTime(post.createdAt)}</span>
              </div>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-meta">{post.commentCount} bình luận</div>
            {!compact && <div className="comment-list">
              {post.comments.map((comment) => (
                <div className="comment-item" key={comment.id}>
                  <strong>{comment.employeeCode ? `${comment.employeeCode} - ${comment.employeeName}` : comment.employeeName}</strong>
                  <span>{comment.content}</span>
                </div>
              ))}
              <form className="comment-form" onSubmit={(e) => submitComment(e, post.id)}>
                <input value={commentByPost[post.id] || ''} onChange={(e) => setCommentByPost((prev) => ({ ...prev, [post.id]: e.target.value }))} placeholder="Viết bình luận..." />
                <button type="submit" disabled={commentMutation.isPending}>Gửi</button>
              </form>
            </div>}
          </article>
        ))}
      </div>
    </div>
  );
}
