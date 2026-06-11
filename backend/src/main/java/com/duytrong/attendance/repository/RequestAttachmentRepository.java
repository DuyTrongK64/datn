package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.RequestAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface RequestAttachmentRepository extends JpaRepository<RequestAttachment, UUID> {

        }
