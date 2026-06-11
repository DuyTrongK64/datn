package com.duytrong.attendance.repository;

        import com.duytrong.attendance.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;
import java.util.List;

        public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
            Optional<RefreshToken> findByTokenHash(String tokenHash);
    List<RefreshToken> findByUserIdAndRevokedFalse(UUID userId);
        }
