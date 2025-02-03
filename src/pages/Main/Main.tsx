import { useState } from "react";
import { H1, Stack } from "@deskpro/deskpro-ui";
import {
  Context,
  Property,
  LoadingSpinner,
  HorizontalDivider,
  useDeskproElements,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import type { TicketData } from "@/types";

/*
    Note: the following page component contains example code, please remove the contents of this component before you
    develop your app. For more information, please refer to our apps
    guides @see https://support.deskpro.com/en-US/guides/developers/anatomy-of-an-app
*/
export const Main = () => {
  const [ticketContext, setTicketContext] = useState<Context<TicketData> | null>(null);

  // Add a "refresh" button @see https://support.deskpro.com/en-US/guides/developers/app-elements
  useDeskproElements(({ registerElement }) => {
    registerElement("myRefreshButton", { type: "refresh_button" });
  });

  // Listen for the "change" event and store the context data
  // as local state @see https://support.deskpro.com/en-US/guides/developers/app-events
  useDeskproAppEvents({
    onChange: setTicketContext,
  });

  // If we don't have a ticket context yet, show a loading spinner
  if (!ticketContext) {
    return <LoadingSpinner />;
  }

  // Show some information about a given
  // ticket @see https://support.deskpro.com/en-US/guides/developers/targets and third party API
  return (
    <>
    </>
  );
};
