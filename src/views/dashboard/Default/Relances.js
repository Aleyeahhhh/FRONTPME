import React, { useState } from "react";
import styled from "@emotion/styled";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";
import { Box, Typography } from "@mui/material";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import { useNavigate } from "react-router-dom";
const CardWrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  padding: 6px;
  position: relative;
`;
const RelanceIcon = styled(ForwardToInboxRoundedIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
`;
const EmailReminderList = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([
    { id: 1, subject: "Paiement en attente !", sentDate: "2023-08-15" },
    { id: 2, subject: "Paiement en attente !", sentDate: "2023-08-16" },
    { id: 3, subject: "Paiement reçu !", sentDate: "2023-08-18" },
  ]);

  const handleListIconClick = () => {
    // Redirect to the specified link
    navigate("/dashboard/relances-envoyées");
  };
  const isLoading = false; // Set this based on your loading logic

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper>
          <RelanceIcon onClick={handleListIconClick} />
          <Box sx={{ p: 0.5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 10000,
                marginBottom: 1.5,
              }}
            >
              Relances automatiques
            </Typography>
            <div>
              <ul>
                {reminders.map((reminder) => (
                  <li key={reminder.id}>
                    <strong>{reminder.subject}</strong> - Sent on{" "}
                    {reminder.sentDate}
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default EmailReminderList;
