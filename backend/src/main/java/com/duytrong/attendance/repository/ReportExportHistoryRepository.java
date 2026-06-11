package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.ReportExportHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

        public interface ReportExportHistoryRepository extends JpaRepository<ReportExportHistory, UUID> {

        }
