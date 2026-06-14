package com.duytrong.attendance.repository;

import com.duytrong.attendance.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    @Query("""
            select m from ChatMessage m
            where (m.senderEmployeeId = :me and m.receiverEmployeeId = :other)
               or (m.senderEmployeeId = :other and m.receiverEmployeeId = :me)
            order by m.createdAt asc
            """)
    List<ChatMessage> findConversation(@Param("me") UUID me, @Param("other") UUID other);

    @Query("""
            select m from ChatMessage m
            where m.senderEmployeeId = :employeeId or m.receiverEmployeeId = :employeeId
            order by m.createdAt desc
            """)
    List<ChatMessage> findRecentForEmployee(@Param("employeeId") UUID employeeId);
}
