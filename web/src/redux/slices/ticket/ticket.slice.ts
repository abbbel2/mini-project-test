/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "../../axios";
import { ResetApiState } from "../../redux.util";
import {
  AddTicketResponse,
  InitialTicketCount,
  SortedTicketType,
  Ticket,
  TicketCountType,
  TicketStateTypes,
} from "./ticket.util";

const name = "tickets";
const extraActions = createExtraActions();

const TicketInitialState: TicketStateTypes = {
  tickets: ResetApiState([]),
  sortedTickets: ResetApiState(null),
  ticketCount: ResetApiState(InitialTicketCount),
  addTicket: ResetApiState(null),
  updateTicket: ResetApiState(null),
};

function createExtraActions() {
  const getTickets = createAsyncThunk<Ticket[]>(
    `${name}/get-tickets`,
    async (_, thunkApi) =>
      axios
        .get("/tickets")
        .then((response) => response.data)
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const getSortedTickets = createAsyncThunk<SortedTicketType | null>(
    `${name}/get-sorted-tickets`,
    async (_, thunkApi) =>
      axios
        .get("/tickets")
        .then((response) => {
          const tickets = response.data as Ticket[];
          const sortedTickets: SortedTicketType = {
            Open: [],
            "In Progress": [],
            Closed: []
          }
          tickets.forEach((ticket) => {
            if (sortedTickets[ticket.status]) {
              sortedTickets[ticket.status].push(ticket);
            }
          })
          return sortedTickets;
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const getTicketCount = createAsyncThunk<TicketCountType | null>(
    `${name}/get-ticket-count`,
    async (_, thunkApi) =>
      axios
        .get("/tickets/count")
        .then((response) => response.data)
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const addTicket = createAsyncThunk<AddTicketResponse, any>(
    `${name}/add-ticket`,
    async (data: any, thunkApi) =>
      axios
        .post("/tickets", data)
        .then((response) => {
          if (response.data.success) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const updateTicket = createAsyncThunk<Ticket | null, any>(
    `${name}/update-ticket`,
    async (data: any, thunkApi) =>
      axios
        .put(`/tickets/${data.id}`, data)
        .then((response) => {
          if (response.data.title) {
            return response.data;
          } else {
            return thunkApi.rejectWithValue(response?.data);
          }
        })
        .catch((error) => thunkApi.rejectWithValue(error?.response?.data))
  );

  const resetAddTicket = createAction(`${name}/reset-add-ticket`);
  const updateTicketStatus = createAction<{previous: string, to: string, ticketId: string}>(`${name}/update-ticket-status`);
  const resetUpdateTicket = createAction(`${name}/reset-update-ticket`);

  return {
    getTickets,
    updateTicketStatus,
    getSortedTickets,
    getTicketCount,
    addTicket,
    updateTicket,
    resetAddTicket,
    resetUpdateTicket,
  };
}

function createExtraReducers(
  builder: ActionReducerMapBuilder<TicketStateTypes>
) {
  return {
    ...getTickets(),
    ...updateTicketStatus(),
    ...getSortedTickets(),
    ...getTicketCount(),
    ...addTicket(),
    ...updateTicket(),
    ...resetAddTicket(),
    ...resetUpdateTicket(),
  };

  function updateTicketStatus() {
    return builder.addCase(extraActions.updateTicketStatus, (state, action) => {
      const {previous, ticketId, to} = action.payload;
      const storedTickets = {...state.sortedTickets.payload} as any;
      const ticketIndex = storedTickets[previous].findIndex((t: any) => t._id === ticketId);

      const ticketToMove = storedTickets[previous].splice(ticketIndex, 1)[0];

      storedTickets[to].push(ticketToMove);
      state.sortedTickets = {
        loading: false,
        payload: storedTickets,
        successful: false,
        error: null,
      };
    });
  }

  function getTickets() {
    return {
      ...builder.addCase(extraActions.getTickets.pending, (state) => {
        state.tickets = {
          loading: true,
          payload: [],
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getTickets.fulfilled, (state, action) => {
        state.tickets = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getTickets.rejected, (state, action) => {
        state.tickets = {
          loading: false,
          payload: [],
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getSortedTickets() {
    return {
      ...builder.addCase(extraActions.getSortedTickets.pending, (state) => {
        state.sortedTickets = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getSortedTickets.fulfilled, (state, action) => {
        state.sortedTickets = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getSortedTickets.rejected, (state, action) => {
        state.sortedTickets = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function getTicketCount() {
    return {
      ...builder.addCase(extraActions.getTicketCount.pending, (state) => {
        state.ticketCount = {
          loading: true,
          payload: InitialTicketCount,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getTicketCount.fulfilled, (state, action) => {
        state.ticketCount = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.getTicketCount.rejected, (state, action) => {
        state.ticketCount = {
          loading: false,
          payload: InitialTicketCount,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function addTicket() {
    return {
      ...builder.addCase(extraActions.addTicket.pending, (state) => {
        state.addTicket = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.addTicket.fulfilled, (state, action) => {
        state.addTicket = {
          loading: false,
          payload: action.payload,
          successful: true,
          error: null,
        };
      }),
      ...builder.addCase(extraActions.addTicket.rejected, (state, action) => {
        state.addTicket = {
          loading: false,
          payload: null,
          successful: false,
          error: action.payload,
        };
      }),
    };
  }

  function updateTicket() {
    return {
      ...builder.addCase(extraActions.updateTicket.pending, (state) => {
        state.updateTicket = {
          loading: true,
          payload: null,
          successful: false,
          error: null,
        };
      }),
      ...builder.addCase(
        extraActions.updateTicket.fulfilled,
        (state, action) => {
          state.updateTicket = {
            loading: false,
            payload: action.payload,
            successful: true,
            error: null,
          };
        }
      ),
      ...builder.addCase(
        extraActions.updateTicket.rejected,
        (state, action) => {
          state.updateTicket = {
            loading: false,
            payload: null,
            successful: false,
            error: action.payload,
          };
        }
      ),
    };
  }

  function resetAddTicket() {
    return builder.addCase(extraActions.resetAddTicket, (state) => {
      state.addTicket = {
        loading: false,
        payload: null,
        successful: false,
        error: null,
      };
    });
  }

  function resetUpdateTicket() {
    return builder.addCase(extraActions.resetUpdateTicket, (state) => {
      state.updateTicket = {
        loading: false,
        payload: null,
        successful: false,
        error: null,
      };
    });
  }
}

const TicketSlice = createSlice({
  name,
  initialState: TicketInitialState,
  reducers: {},
  extraReducers: (builder) => createExtraReducers(builder),
});

export const ticketActions = { ...TicketSlice.actions, ...extraActions };
export const ticketReducer = TicketSlice.reducer;
